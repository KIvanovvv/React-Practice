import React from "react";

import ExpneseForm from "./ExpenseForm.js";
import "./NewExpense.css";

const NewExpense = () => {
  return (
    <div className="new-expense">
      <ExpneseForm />
    </div>
  );
};

export default NewExpense;
