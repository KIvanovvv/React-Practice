import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context.js";
import Modal from "../UI/Modal.js";

import CartItem from "./CartItem.js";
import classes from "./Cart.module.css";
import Checkout from "./Checkout.js";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [hasSubmited, setHasSubmited] = useState(false);
  const [hasError, setHasError] = useState(null);
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

  const orderSubmitHandler = async (userData) => {
    setIsSubmiting(true);
    try {
      const response = await fetch(
        `http://react-http-5f055-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Something went wrong please try again!`);
      }
      setIsSubmiting(false);
      setHasSubmited(true);
      cartCtx.resetCart();
    } catch (error) {
      setHasError(error.message);
    }

    console.log(userData);
  };

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

  let content = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClick} onOrder={orderSubmitHandler} />
      )}
      {!isCheckout && modalControls}
    </React.Fragment>
  );
  if (hasError) {
    content = (
      <div className={classes.actions}>
        <p>{hasError}</p>
      </div>
    );
  }
  if (isSubmiting && !hasSubmited && !hasError) {
    content = (
      <div className={classes.actions}>
        <p>Making your order. Please wait!</p>
      </div>
    );
  }
  if (hasSubmited && !isSubmiting) {
    content = (
      <div className={classes.actions}>
        <p>Your order has been placed !</p>
        <button onClick={props.onClick}>Close</button>
      </div>
    );
  }
  return <Modal onBackdropClick={props.onClick}>{content}</Modal>;
};

export default Cart;
