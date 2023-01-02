import React, { useState } from "react";
import AddUser from "./components/User/AddUser.js";
import UserList from "./components/User/UserList.js";

function App() {
  const [usersList, setUsersList] = useState([]);
  const onAddUserHandler = (username, age) => {
    setUsersList((prevList) => {
      return [...prevList, { username, age, id: Math.random().toString() }];
    });
  };

  return (
    <div>
      <AddUser onAdd={onAddUserHandler} />
      <UserList users={usersList} />
    </div>
  );
}

export default App;
