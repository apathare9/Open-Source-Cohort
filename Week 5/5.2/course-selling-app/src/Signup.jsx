import Button from "@mui/material/Button";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <center>
        <div>Welcome to Coursera. Sign Up Below</div>
        <div>
          Username -{" "}
          <input
            type={"text"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <br />
          Password -{" "}
          <input
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              function callback2(data) {
                localStorage.setItem("token", data.token);
                window.location = "/";
                // console.log(data);
              }
              function callback1(res) {
                res.json().then(callback2);
              }

              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then(callback1);
            }}
          >
            Sign Up
          </Button>
          ;
        </div>
      </center>
    </>
  );
}

export default Signup;
