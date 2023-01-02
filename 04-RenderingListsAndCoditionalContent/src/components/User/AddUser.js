import React, { useState } from "react";
import Button from "../UI/Button.js";
import Card from "../UI/Card.js";
import ErrorModal from "../UI/ErrorModal.js";

import classes from "./AddUser.module.css";
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState(``);
  const [enteredAge, setEnteredAge] = useState(``);
  const [error, setError] = useState();
  const addUserHandler = (e) => {
    e.preventDefault();
    if (
      enteredUsername.trim().length === 0 ||
      enteredUsername.trim().length === 0
    ) {
      setError({
        title: "All fields are required!",
        message: "Please fill all fields with valid data!",
      });
      return;
    }
    if (enteredAge < 1) {
      setError({
        title: "Please enter valid age!",
        message: "It must be bigger than 0.",
      });
      return;
    }
    props.onAdd(enteredUsername, enteredAge);
    setEnteredUsername(``);
    setEnteredAge(``);
  };
  const usernameHandler = (e) => {
    setEnteredUsername(e.target.value);
  };
  const ageHandler = (e) => {
    setEnteredAge(e.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={enteredUsername}
            onChange={usernameHandler}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            name="age"
            value={enteredAge}
            onChange={ageHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
