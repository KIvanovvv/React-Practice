import React from "react";
import Modal from "../UI/Modal.js";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul>
      {[{ id: "a1", name: "Musaka", amount: 1, price: 7.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onBackdropClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.32</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClick} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
