import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { Container } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { logIn } from "../../api/configRequest";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await logIn(username, password).then((response) => {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    });
  };

  return (
    <Container>
      <Typography variant="h3">Log In</Typography>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword || password === "" ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </FormControl>
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/signUp")}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default LogIn;
