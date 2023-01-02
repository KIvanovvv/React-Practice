import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helpers/Wrapper.js";

const AddUser = (props) => {
  const [error, setError] = useState();
  const enteredName = useRef();
  const enteredUserAge = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.current.value.trim().length === 0 ||
      enteredUserAge.current.value.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge.current.value < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName.current.value, enteredUserAge.current.value);
    enteredName.current.value = "";
    enteredUserAge.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={enteredName} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={enteredUserAge} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
