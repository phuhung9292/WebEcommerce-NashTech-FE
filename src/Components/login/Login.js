import React, { useState, useContext } from "react";
import AuthProvider from "../../Services/AuthProvider";
import AuthService from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { Refresh } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Login() {
  // const { setAuth } = useContext(AuthProvider);
  const [details, setDetails] = useState({ email: "", password: "" });
  // const [success, setSuccess] = useState(false);
  let navigate = useNavigate();

  const login = async () => {
    try {
      const response = AuthService.login(details.email, details.password).then(
        (res) => {
          console.log(res.data.email);
          // setSuccess(true);
          // if (res.data.email == null) {
          //   setSuccess(false);
          // }
          // const accessToken = res.data.token;
          // const role = (res = res.data.authority.role);
          // setAuth({ role, accessToken });
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/home");
          window.location.reload(false);
        }
      );
    } catch (err) {
      console.log("login Fail");
    }
  };
  return (
    <>
      <form>
        <Stack spacing={2} direction="column">
          <Stack spacing={2} direction="column">
            <TextField
              label="Email"
              id="fullWidth"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
            <TextField
              label="Password"
              id="fullWidth"
              type="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </Stack>
          <Button
            sx={{
              width: 100,
              maxWidth: "100%",
            }}
            variant="outlined"
            onClick={login}
          >
            Login
          </Button>
        </Stack>

        {/* <div>
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
      </div> */}
      </form>
    </>
  );
}
export default Login;
