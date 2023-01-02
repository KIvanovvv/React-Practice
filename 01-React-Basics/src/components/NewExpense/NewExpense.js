import React, { useState } from "react";

import ExpneseForm from "./ExpenseForm.js";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const saveExpenseDateHandler = (enteredExpenseDate) => {
    const expenseData = {
      ...enteredExpenseDate,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };
  const startEditingHandler = () => {
    setIsEditing((prevState) => !prevState);
  };
  return (
    <div className="new-expense">
      {isEditing && (
        <ExpneseForm
          onCancel={startEditingHandler}
          onSaveExpenseDate={saveExpenseDateHandler}
        />
      )}
      {!isEditing && (
        <button onClick={startEditingHandler}>Add new expense</button>
      )}
    </div>
  );
};

export default NewExpense;
