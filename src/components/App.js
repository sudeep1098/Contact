import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";
import EditContact from "./EditContact";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [contacts, setContact] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //retreive contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  async function addcontact(newcontact) {
    console.log(newcontact);
    const request = {
      id: uuidv4(),
      ...newcontact,
    };
    const response = await api.post("/contacts", request);
    setContact((prevValue) => {
      return [...prevValue, response.data];
    });
  }
  async function deleteContact(id) {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContact(newContactList);
  }
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContact(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  const searchHandler = (SearchTerm) => {
    setSearch(SearchTerm);
    if (SearchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(SearchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retrivedContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrivedContact) setContact(retrivedContact);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContact(allContacts);
    };
    getAllContacts();
  }, []);
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            Component={() => (
              <ContactList
                contacts={search.length < 1 ? contacts : searchResults}
                getContactId={deleteContact}
                term={search}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            Component={() => <AddContact onadd={addcontact} />}
          />

          <Route path="/contact/:id" Component={ContactDetail} />

          <Route
            path="/edit"
            Component={() => <EditContact onUpdate={updateContactHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
