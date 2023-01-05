import { useState } from "react";

const SimpleInput = (props) => {
  const [name, setName] = useState("");
  const [isNameInputTouched, setIsNameInputTouched] = useState(false);

  const isNameValid = name.trim() !== "";
  const enteredNameisInvalid = !isNameValid && isNameInputTouched;

  const onInputChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onInputBlurHandler = () => {
    setIsNameInputTouched(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsNameInputTouched(true);
    if (!isNameValid) {
      return;
    }
    console.log(name);
    setName("");
    setIsNameInputTouched(false);
  };

  const nameInputClasses = enteredNameisInvalid
    ? "form-control invalid"
    : "form-control ";
  return (
    <form onSubmit={onSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={onInputChangeHandler}
          onBlur={onInputBlurHandler}
          type="text"
          id="name"
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
