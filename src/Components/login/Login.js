import React, { useState } from "react";
import AuthService from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { Refresh } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const login = async () => {
    AuthService.login(details.email, details.password).then((res) => {
      console.log(res.data.email);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/home");
    });
  };
  return (
    <form>
      <Stack spacing={2} direction="column">
        <Stack spacing={2} direction="column">
          <TextField label="fullWidth" id="fullWidth" />
          <TextField label="fullWidth" id="fullWidth" type="password" />
        </Stack>
        <Button
          sx={{
            width: 100,
            maxWidth: "100%",
          }}
          variant="outlined"
        >
          Login
        </Button>
      </Stack>

      <div>
        <label>Email: </label>
        <input
          type="text"
          name="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          value={details.email}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        ></input>
      </div>
      <div>
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
    </form>
  );
}
export default Login;
