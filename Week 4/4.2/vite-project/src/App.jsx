/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to Gym",
      description: "Hit Gym from 5-7",
      id: 1,
    },
    {
      title: "Go to class",
      description: "Hit Gym from 7-9",
      id: 2,
    },
  ]);

  return (
    <div>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
          ></Todo>
        );
      })}
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      {props.title}
      {props.description}
    </div>
  );
}

export default App;
