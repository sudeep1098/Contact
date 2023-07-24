import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddContact(props) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    event.preventDefault();
    props.onadd(contact);
    setContact({
      name: "",
      email: "",
    });
    navigate("/");
  }
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form onSubmit={handleClick} className="ui form">
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
        <button className="ui button blue">Add contact</button>
        <Link to="/">
          <button style={{ float: "right" }} className="ui button blue">
            Contact List
          </button>
        </Link>
      </form>
    </div>
  );
}
export default AddContact;
