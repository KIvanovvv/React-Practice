import { useState } from "react";

const SimpleInput = (props) => {
  const [name, setName] = useState("");
  const [isNameInputTouched, setIsNameInputTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);

  const isNameValid = name.trim() !== "";
  const enteredNameisInvalid = !isNameValid && isNameInputTouched;

  const isEmailValid = email.includes("@");
  const enteredEmailIsInvalid = !isEmailValid && isEmailInputTouched;

  let isFormValid = false;

  if (isNameValid && isEmailValid) {
    isFormValid = true;
  }

  const onNameInputChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onNameInputBlurHandler = () => {
    setIsNameInputTouched(true);
  };

  const onEmailInputHandelr = (e) => {
    setEmail(e.target.value);
  };
  const onEmailBlurHandler = () => {
    setIsEmailInputTouched(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(name);
    setName("");
    setEmail("");
    setIsNameInputTouched(false);
    setIsEmailInputTouched(false);
  };

  const nameInputClasses = enteredNameisInvalid
    ? "form-control invalid"
    : "form-control ";
  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={onSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={onNameInputChangeHandler}
          onBlur={onNameInputBlurHandler}
          type="text"
          id="name"
          value={name}
        />
        {enteredNameisInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          onChange={onEmailInputHandelr}
          onBlur={onEmailBlurHandler}
          type="email"
          id="email"
          value={email}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Email must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
