import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container } from "@mui/system";
import { signUp } from "../../api/configRequest";



const SignUp = () => {
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
    await signUp(username, password).then((response) => {
      navigate("/login");
    });
  };

  return (
    <Container>
      <Typography variant="h3">Sign Up</Typography>
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
            type={showPassword || password == "" ? "text" : "password"}
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
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => navigate('/login')}
      >
        Log In
      </Button>
    </Container>
  );
};

export default SignUp;
