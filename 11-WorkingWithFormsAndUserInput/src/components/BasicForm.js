import useFormInput from "../hooks/use-FormInput.js";
const BasicForm = (props) => {
  const {
    value: firstName,
    isValueValid: isNameValid,
    isValueInputFiledInvalid: isNameInputFiledInvalid,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useFormInput((input) => input.trim() !== "");
  const {
    value: lastName,
    isValueValid: isLastNameValid,
    isValueInputFiledInvalid: isLastNameInputFiledInvalid,
    valueChangeHandler: lastNameInputChangeHandler,
    valueBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useFormInput((input) => input.trim() !== "");
  const {
    value: email,
    isValueValid: isEmailValid,
    isValueInputFiledInvalid: isEmailInputFiledInvalid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useFormInput((input) => input.includes("@"));
  let isFormValid = false;

  if (isNameValid && isLastNameValid && isEmailValid) {
    isFormValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    resetNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameClasses = `form-control ${
    isNameInputFiledInvalid ? `invalid` : ""
  }`;
  const lastNameClasses = `form-control ${
    isLastNameInputFiledInvalid ? `invalid` : ""
  }`;
  const emailClasses = `form-control ${
    isEmailInputFiledInvalid ? `invalid` : ""
  }`;
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={firstName}
          />
          {isNameInputFiledInvalid && (
            <p className="error-text">First name filed must not be empty</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={lastName}
          />
          {isLastNameInputFiledInvalid && (
            <p className="error-text">Last name filed must not be empty</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={email}
        />
        {isEmailInputFiledInvalid && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
