import React from "react";

import ExpneseForm from "./ExpenseForm.js";
import "./NewExpense.css";

const NewExpense = (props) => {
  const saveExpenseDateHandler = (enteredExpenseDate) => {
    const expenseData = {
      ...enteredExpenseDate,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpneseForm onSaveExpenseDate={saveExpenseDateHandler} />
    </div>
  );
};

export default NewExpense;
