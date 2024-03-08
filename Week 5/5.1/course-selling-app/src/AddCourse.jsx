import Button from "@mui/material/Button";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <center>
        <div>Add your desired course below....</div>
        <div>
          Title -{" "}
          <input
            type={"text"}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <br />
          Description -{" "}
          <input
            type={"text"}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              function callback2(data) {
                localStorage.setItem("token", data.token);
                // console.log(data);
              }
              function callback1(res) {
                res.json().then(callback2);
              }

              fetch("http://localhost:3000/admin/courses", {
                method: "POST",
                body: JSON.stringify({
                  username: title,
                  password: description,
                  imageLink: "",
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }).then(callback1);
            }}
          >
            Add Course
          </Button>
          ;
        </div>
      </center>
    </>
  );
}

export default AddCourse;
