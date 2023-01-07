import React, { useEffect, useState } from "react";

import Card from "../UI/Card.js";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem.js";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const respone = await fetch(
          "http://react-http-5f055-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );
        if (!respone.ok) {
          throw new Error(`Something went wrong: Error ${respone.status}`);
        }
        if (respone.status === 204) {
          throw new Error(`Your catalog is empty! `);
        }
        const data = await respone.json();
        const fetchedMeals = Object.values(data);
        setMeals(fetchedMeals);
      } catch (error) {
        setHasError(error.message);
      }
    };
    fetchMeals();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals_loading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (hasError) {
    return (
      <section className={classes.meals_error}>
        <p>{hasError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
