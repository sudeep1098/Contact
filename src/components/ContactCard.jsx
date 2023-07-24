import React from "react";
import user from "../images/user.svg";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="avatar" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        onClick={() => {
          props.handleClick(id);
        }}
        style={{
          float: "right",
          color: "red",
          marginTop: "7px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
        className="trash alternate outline icon"
      ></i>
      <Link to={`/edit`} state={{ contact: props.contact }}>
        <i
          style={{
            float: "right",
            color: "blue",
            marginTop: "7px",
            cursor: "pointer",
          }}
          className="edit alternate outline icon"
        ></i>
      </Link>
    </div>
  );
};
export default ContactCard;
