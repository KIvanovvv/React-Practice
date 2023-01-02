import useCounter from "../hooks/use-counter.js";

import Card from "./Card";

const BackwardCounter = () => {
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
