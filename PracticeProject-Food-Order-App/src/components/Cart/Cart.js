import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context.js";
import Modal from "../UI/Modal.js";

import CartItem from "./CartItem.js";
import classes from "./Cart.module.css";
import Checkout from "./Checkout.js";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalControls = (
    <div className={classes.actions}>
      <button onClick={props.onClick} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onBackdropClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClick} />}
      {!isCheckout && modalControls}
    </Modal>
  );
};

export default Cart;
