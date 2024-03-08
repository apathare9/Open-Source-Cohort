import Button from "@mui/material/Button";

function Appbar() {
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
