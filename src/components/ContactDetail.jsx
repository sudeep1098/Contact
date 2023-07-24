import React from "react";
import user from "../images/user.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function ContactDetail(props) {
  const { state } = useLocation();
  const { name, email } = state.contact;

  return (
    <div style={{ marginTop: "60px" }} className="ui main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
        <Link to={"/"}>
          <button
            style={{ float: "right", marginBottom: "10px" }}
            className="ui button blue"
          >
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
