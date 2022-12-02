import React from "react";
import Button from "../UI/Button.js";
import Card from "../UI/Card.js";

import classes from "./AddUser.module.css";
const AddUser = (props) => {
  const addUserHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, age } = Object.fromEntries(formData);
    console.log(username, age);
    e.target.reset();
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="age">Age (years)</label>
        <input id="age" type="number" name="age" />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
