import React, { useReducer } from "react";
import CartContext from "./cart-context.js";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const currentItem = state.items.find((el) => el.id === action.item.id);

    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    if (currentItem) {
      currentItem.amount += action.item.amount;
      return {
        items: state.items,
        totalAmount: updateTotalAmount,
      };
    } else {
      const updatetItems = state.items.concat(action.item);
      return {
        items: updatetItems,
        totalAmount: updateTotalAmount,
      };
    }
  } else if (action.type === "REMOVE_ITEM") {
    let updateTotalAmount = state.totalAmount;
    const currentItem = state.items.find((el) => el.id === action.id);
    currentItem.amount--;
    if (currentItem.amount === 0) {
      const indexOfItem = state.items.indexOf(currentItem);
      const updatedItems = state.items;
      updatedItems.splice(indexOfItem, 1);
      updateTotalAmount -= currentItem.price;
      return {
        items: updatedItems,
        totalAmount: updateTotalAmount,
      };
    }
    updateTotalAmount -= currentItem.price;
    return {
      items: state.items,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
