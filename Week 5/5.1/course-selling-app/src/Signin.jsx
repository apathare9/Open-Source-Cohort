import Button from "@mui/material/Button";

function Signin() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <center>
        <div>Welcome to Coursera. Sign in Below</div>
        <div>
          Username - <input type={"text"}></input>
          <br />
          Password - <input type={"password"}></input>
          <br />
          <Button variant="contained">Sign In</Button>;
        </div>
      </center>
    </>
  );
}

export default Signin;
