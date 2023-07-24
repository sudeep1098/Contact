import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function EditContact(props) {
  const { state } = useLocation();
  const { id, name, email } = state.contact;
  const [contact, setContact] = useState({
    id,
    name,
    email,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    console.log(event.target.value);
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function UpdatehandleClick(event) {
    event.preventDefault();
    props.onUpdate(contact);
    setContact({
      name: "",
      email: "",
    });
    navigate("/");
  }
  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form onSubmit={UpdatehandleClick} className="ui form">
        <div className="field">
          <label>Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={contact.name}
            placeholder="Name"
          ></input>
        </div>
        <div className="field">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={contact.email}
            placeholder="Email"
          ></input>
        </div>
        <button className="ui button blue">Update</button>
        <Link to="/">
          <button style={{ float: "right" }} className="ui button blue">
            Contact List
          </button>
        </Link>
      </form>
    </div>
  );
}
export default EditContact;
