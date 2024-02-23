import { useState } from "react";
import "./App.css";

// var todos = [{
//   title: "go to gym",
//   description: "go to gym @11 ",
//   id: 1
// },{
//   title: "go eat food",
//   description: "go to sleep @12 ",
//   id: 2
// }, ]

// let todo = {
//   title: "go to gym",
//   description: "go to gym @11 ",
//   id: 1,
// };

var todoForToday = {
  title: "Go to gym",
  description: "Hit gym from 7-9",
  id: 1,
};

function App() {
  return (
    <div>
      {todoForToday.title}
      {todoForToday.description}
    </div>
  );
}

export default App;
