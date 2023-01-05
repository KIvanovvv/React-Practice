import useInput from "../hooks/use-input.js";

const SimpleInput = (props) => {
  const {
    enteredValue: name,
    isValueValid: isNameValid,
    enteredValueIsInvalid: enteredNameisInvalid,
    onValueChange: onNameInputChangeHandler,
    onValueBlur: onNameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: email,
    isValueValid: isEmailValid,
    enteredValueIsInvalid: enteredEmailIsInvalid,
    onValueChange: onEmailInputChangeHandler,
    onValueBlur: onEmailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let isFormValid = false;

  if (isNameValid && isEmailValid) {
    isFormValid = true;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(name);
    console.log(email);
    resetNameInput();
    resetEmailInput();
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
          onChange={onEmailInputChangeHandler}
          onBlur={onEmailInputBlurHandler}
          type="email"
          id="email"
          value={email}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Please enter valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
