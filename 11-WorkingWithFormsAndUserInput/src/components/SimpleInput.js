import { useState, useRef } from "react";

const SimpleInput = (props) => {
  //const [name, setName] = useState("");
  const inputNameRef = useRef();

  const onInputChangeHandler = (e) => {
    // setName(e.target.value);
    setName(inputNameRef.current.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    console.log(name);
    setName("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          onChange={onInputChangeHandler}
          type="text"
          id="name"
          ref={inputNameRef}
          value={name}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
