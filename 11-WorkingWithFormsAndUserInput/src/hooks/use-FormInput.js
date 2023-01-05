import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};
const stateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }

  return initialState;
};

const useFormInput = (valueValidator) => {
  const [inputState, dispatch] = useReducer(stateReducer, initialState);
  // const [value, setValue] = useState("");
  // const [isValueTouched, setIsValueTouched] = useState(false);

  const isValueValid = valueValidator(inputState.value);
  const isValueInputFiledInvalid = !isValueValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
    // setValue(e.target.value);
  };

  const valueBlurHandler = () => {
    dispatch({ type: "BLUR" });
    // setIsValueTouched(true);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    // setValue("");
    // setIsValueTouched(false);
  };

  return {
    value: inputState.value,
    isValueValid,
    isValueInputFiledInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
export default useFormInput;
