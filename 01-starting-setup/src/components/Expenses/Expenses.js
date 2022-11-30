import React, { useState } from "react";

import Card from "../UI/Card.js";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter.js";
import ExpensesList from "./ExpensesList.js";

const Expenses = (props) => {
  const [filterdYear, setFilteredYear] = useState(`2020`);
  const filterChangeHandler = (year) => {
    console.log(`From Expenses.js`);
    setFilteredYear(year);
  };
  const filteredExpenses = props.data.filter(
    (x) => x.date.getFullYear().toString() === filterdYear
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter year={filterdYear} onSelectYear={filterChangeHandler} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
