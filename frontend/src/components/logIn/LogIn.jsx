import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { logIn } from '../../api/configRequest';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(username, password).then((response) => {
      localStorage.setItem("token", response.data.token)
      navigate("/")
    })
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Log in
      </Button>
    </form>
  );
}

export default LogIn;