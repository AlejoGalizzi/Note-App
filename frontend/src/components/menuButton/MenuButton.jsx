import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { Link } from "react-router-dom";

const MenuButton = ({linkObject = () => {}}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <DensityMediumIcon color="white" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Link to="/home">
            <Button
              id="fade-button"
              aria-controls={true ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={true ? "true" : undefined}
              onClick={() => {}}
            >
              <Typography variant="p" component="p" color="black">
                HOME
              </Typography>
            </Button>
          </Link>
        </MenuItem>
        {linkObject && <MenuItem>{linkObject()}</MenuItem>}
        <MenuItem>
          <Button
            id="fade-button"
            aria-controls={true ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={true ? "true" : undefined}
            onClick={handleLogOut}
          >
            <Typography variant="p" component="p" color="black">
              Log Out
            </Typography>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuButton;
