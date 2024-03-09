import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

function Appbar() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    function callback2(data) {
      if (data.username) {
        setUserEmail(data.username);
      }
      console.log(data);
    }

    function callback1(res) {
      res.json().then(callback2);
    }

    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  if (userEmail) {
    return (
      <div className="flex  ">
        {userEmail}
        <Button
          variant="contained"
          onClick={() => {
            localStorage.setItem("token", null);
            window.location = "/ ";
          }}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex  ">
      <Button
        variant="contained"
        onClick={() => {
          window.location = "/signup";
        }}
      >
        Signup
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          window.location = "/signin";
        }}
      >
        SignIn
      </Button>
    </div>
  );
}

export default Appbar;
