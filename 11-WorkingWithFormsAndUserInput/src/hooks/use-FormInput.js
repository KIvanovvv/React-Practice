import { useState } from "react";

const useFormInput = (valueValidator) => {
  const [value, setValue] = useState("");
  const [isValueTouched, setIsValueTouched] = useState(false);

  const isValueValid = valueValidator(value);
  const isValueInputFiledInvalid = !isValueValid && isValueTouched;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const valueBlurHandler = () => {
    setIsValueTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsValueTouched(false);
  };

  return {
    value,
    isValueValid,
    isValueInputFiledInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
export default useFormInput;
