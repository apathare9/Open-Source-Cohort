/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./App.css";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTodos(data);
      });
    });

    setInterval(() => {
      fetch("http://localhost:3000/todos", {
        method: "GET",
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setTodos(data);
        });
      });
    });
  }, []);

  return todos;
}

function App() {
  const todos = useTodos();

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.title}
            {todo.description}
            <button>Delete</button>
            <br />
          </div>
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
