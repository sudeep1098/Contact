import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  function deleteContact(id) {
    props.getContactId(id);
  }

  const renderedContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        handleClick={deleteContact}
        contact={contact}
      />
    );
  });

  const getSearchTerm = (event) => {
    const { name, value } = event.target;

    props.searchKeyword(value);
  };

  return (
    <div className="main">
      <h1 style={{ paddingTop: "60px" }}>
        Contact List
        <div
          style={{ float: "right", padding: "0px", fontSize: "16px" }}
          className="ui search"
        >
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search Contacts"
              className="prompt"
              value={props.term}
              onChange={getSearchTerm}
            />
            <i className="search icon" />
          </div>
        </div>
      </h1>

      <div className="ui celled list">
        {renderedContactList.length > 0
          ? renderedContactList
          : "No Contacts Available"}
      </div>
      <Link to="/add">
        <button style={{ float: "right" }} className="ui button blue">
          Add Contact
        </button>
      </Link>
    </div>
  );
};
export default ContactList;
