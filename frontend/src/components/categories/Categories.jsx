import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { deleteCategory, getCategories } from "../../api/configRequest";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { DeleteOutline } from "@mui/icons-material";
import { Container } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({})
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  const onHandleDelete = () => {
    deleteCategory(selectedCategory.id).then(() => {
      const actualCategories = categories.filter((category) => {
        if (category.id === selectedCategory.id) {
          return false;
        } else {
          return true;
        }
      });
      setCategories(actualCategories);
    });
    setSelectedCategory(null);
    setOpenDeleteModal(false);
  }

  const renderCategoriesAPI = () => {
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    renderCategoriesAPI()
  }, []);

  const renderCategories = () => {
    if (categories.length === 0) {
      return (
        <Grid item>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              There is no categories here
            </Typography>
            <Icon fontSize="large">
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Icon>
          </Box>
        </Grid>
      );
    }
    return categories.map((category, index) => (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => {
            setSelectedCategory(category);
            setOpenDeleteModal(true);
          }}>
            <DeleteOutline />
          </IconButton>
        }
      >
        <ListItemAvatar key={index}>
            <BookmarkIcon sx={{ color: category.color, backgroundColor: category }} fontSize="large"/>
        </ListItemAvatar>
        <ListItemText primary={category.name} />
      </ListItem>
    ));
  };

  return <><Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Categories
            </Typography>
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
          </Toolbar>
        </AppBar>
      </Box>
      <List >{renderCategories()}</List>
    </Container>
    <ConfirmationModal
      open={openDeleteModal}
      setOpen={setOpenDeleteModal}
      handleConfirm={onHandleDelete}
      setObject={setSelectedCategory}
    />
    </>;
};

export default Categories;
