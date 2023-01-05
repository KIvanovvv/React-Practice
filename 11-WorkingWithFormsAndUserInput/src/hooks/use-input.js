import { useState } from "react";

const useInput = (valueValidator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = valueValidator(enteredValue);
  const enteredValueIsInvalid = !isValueValid && isTouched;

  const onValueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const onValueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    enteredValue,
    isValueValid,
    enteredValueIsInvalid,
    onValueChange: onValueChangeHandler,
    onValueBlur: onValueBlurHandler,
    reset,
  };
};

export default useInput;
