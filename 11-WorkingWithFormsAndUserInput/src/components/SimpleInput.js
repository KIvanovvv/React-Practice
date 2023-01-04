import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [name, setName] = useState("");
  const inputNameRef = useRef();
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameInputTouched, setIsNameInputTouched] = useState(false);

  const onInputChangeHandler = (e) => {
    // setName(e.target.value);
    setName(inputNameRef.current.value);
    setIsNameValid(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsNameInputTouched(true);
    if (name.trim() === "") {
      setIsNameValid(false);
      return;
    }
    console.log(name);
    setName("");
  };
  const enteredNameisInvalid = !isNameValid && isNameInputTouched;
  const nameInputClasses = enteredNameisInvalid
    ? "form-control invalid"
    : "form-control ";
  return (
    <form onSubmit={onSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={onInputChangeHandler}
          type="text"
          id="name"
          ref={inputNameRef}
          value={name}
        />
        {enteredNameisInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
