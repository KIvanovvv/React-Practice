import { useEffect, useReducer, useState } from "react";
import classes from "./Checkout.module.css";

const initialState = {
  name: "",
  nameTouched: false,
  nameIsValid: false,
  street: "",
  streetTouched: false,
  streetIsValid: false,
  postcode: "",
  postcodeTouched: false,
  postcodeIsValid: false,
  city: "",
  cityTouched: false,
  cityIsValid: false,
};
const reducer = (state, action) => {
  if (action.type === "NAME") {
    const isValid = action.value.trim().length > 0;
    return {
      ...state,
      name: action.value,
      nameTouched: true,
      nameIsValid: isValid,
    };
  }
  if (action.type === "NAMEBLUR") {
    return {
      ...state,
      nameTouched: true,
    };
  }
  if (action.type === "STREET") {
    const isValid = action.value.trim().length > 0;
    return {
      ...state,
      street: action.value,
      streetTouched: true,
      streetIsValid: isValid,
    };
  }
  if (action.type === "STREETBLUR") {
    return {
      ...state,
      streetTouched: true,
    };
  }
  if (action.type === "POSTCODE") {
    const isValid = action.value.trim().length === 5;
    return {
      ...state,
      postcode: action.value,
      postcodeTouched: true,
      postcodeIsValid: isValid,
    };
  }
  if (action.type === "POSTCODEBLUR") {
    return {
      ...state,
      postcodeTouched: true,
    };
  }
  if (action.type === "CITY") {
    const isValid = action.value.trim().length > 0;
    return {
      ...state,
      city: action.value,
      cityTouched: true,
      cityIsValid: isValid,
    };
  }
  if (action.type === "CITYBLUR") {
    return {
      ...state,
      cityTouched: true,
    };
  }
  if (action.type === "SUBMITION") {
    return {
      ...state,
      nameTouched: true,
      streetTouched: true,
      postcodeTouched: true,
      cityTouched: true,
    };
  }
  if (action.type === "SUBMITED") {
    return initialState;
  }

  return initialState;
};

const Checkout = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, dispatch] = useReducer(reducer, initialState);

  const nameOnChange = (e) => {
    dispatch({ type: "NAME", value: e.target.value });
  };
  const nameOnBlur = () => {
    dispatch({ type: "NAMEBLUR" });
  };

  const streetOnChange = (e) => {
    dispatch({ type: "STREET", value: e.target.value });
  };
  const streetOnBlur = () => {
    dispatch({ type: "STREETBLUR" });
  };

  const postcodeOnChange = (e) => {
    dispatch({ type: "POSTCODE", value: e.target.value });
  };
  const postcodeOnBlur = () => {
    dispatch({ type: "POSTCODEBLUR" });
  };

  const cityOnChange = (e) => {
    dispatch({ type: "CITY", value: e.target.value });
  };
  const cityOnBlur = () => {
    dispatch({ type: "CITYBLUR" });
  };

  useEffect(() => {
    let formValid =
      inputs.nameIsValid &&
      inputs.streetIsValid &&
      inputs.cityIsValid &&
      inputs.postcodeIsValid;
    setIsFormValid(formValid);
  }, [inputs]);

  const confirmHandler = (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMITION" });
    if (!isFormValid) {
      console.log(`Inputs are invalid`);
      // console.log(inputs);
      return;
    }
    props.onOrder({
      name: inputs.name,
      street: inputs.street,
      postcode: inputs.postcode,
      city: inputs.city,
    });
    console.log(`Submited`);
    // console.log(inputs);
    dispatch({ type: "SUBMITED" });
  };

  const inputClasses = {
    name: `${classes.control} ${
      !inputs.nameIsValid && inputs.nameTouched && classes.invalid
    }`,
    street: `${classes.control} ${
      !inputs.streetIsValid && inputs.streetTouched && classes.invalid
    }`,
    postcode: `${classes.control} ${
      !inputs.postcodeIsValid && inputs.postcodeTouched && classes.invalid
    }`,
    city: `${classes.control} ${
      !inputs.cityIsValid && inputs.cityTouched && classes.invalid
    }`,
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={inputClasses.name}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={inputs.name}
          onChange={nameOnChange}
          onBlur={nameOnBlur}
        />
        {!inputs.nameIsValid && inputs.nameTouched && (
          <p className={classes.error_text}>Please enter a valid name!</p>
        )}
      </div>
      <div className={inputClasses.street}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={inputs.street}
          onChange={streetOnChange}
          onBlur={streetOnBlur}
        />
        {!inputs.streetIsValid && inputs.streetTouched && (
          <p className={classes.error_text}>Please enter a valid street!</p>
        )}
      </div>
      <div className={inputClasses.postcode}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={inputs.postcode}
          onChange={postcodeOnChange}
          onBlur={postcodeOnBlur}
        />
        {!inputs.postcodeIsValid && inputs.postcodeTouched && (
          <p className={classes.error_text}>
            Please enter a valid postcode (Must be 5 characters)!
          </p>
        )}
      </div>
      <div className={inputClasses.city}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={inputs.city}
          onChange={cityOnChange}
          onBlur={cityOnBlur}
        />
        {!inputs.cityIsValid && inputs.cityTouched && (
          <p className={classes.error_text}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
