import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem.js";
import Card from "../UI/Card.js";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter.js";

const Expenses = (props) => {
  const [filterdYear, setFilteredYear] = useState(`2020`);
  const filterChangeHandler = (year) => {
    console.log(`From Expenses.js`);
    setFilteredYear(year);
  };
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter year={filterdYear} onSelectYear={filterChangeHandler} />
        {props.data.map((expense) => (
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
      </Card>
    </div>
  );
};

export default Expenses;
