import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { deleteCategory, getCategories, createCategory } from "../../api/configRequest";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { DeleteOutline } from "@mui/icons-material";
import { Container } from "@mui/system";
import MenuButton from "../menuButton/MenuButton";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { ColorPicker } from "material-ui-color";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("#808080");
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
  };

  const handleCategorySubmit = () => {
    createCategory({name: newCategory, color: newColor}).then((response) => {
      setCategories([...categories, response.data]);
      setError(null);
      setNewCategory("");
    }).catch(error => {
      const {status, messages} = error.response.data;
      if(status === 422) {
        const message = messages[Object.keys(messages)[0]]
        if(messages.length !== 0) {
          setError({name: 'category', message: message});
        }
      }
    })
  }

  const renderCategoriesAPI = () => {
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    renderCategoriesAPI();
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
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              setSelectedCategory(category);
              setOpenDeleteModal(true);
            }}
          >
            <DeleteOutline />
          </IconButton>
        }
      >
        <ListItemAvatar key={index}>
          <BookmarkIcon
            sx={{ color: category.color, backgroundColor: category }}
            fontSize="large"
          />
        </ListItemAvatar>
        <ListItemText primary={category.name} />
      </ListItem>
    ));
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Categories
              </Typography>
              <MenuButton />
            </Toolbar>
          </AppBar>
        </Box>
        <TextField
            error={error ? true : false}
            margin="dense"
            name="category"
            label="Add Category"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            size="medium"
            helperText={
              error ? error.message : null
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ColorPicker
                    defaultValue={"gray"}
                    value={newColor}
                    onChange={(event) => setNewColor(event.css.backgroundColor)}
                    disableTextfield
                    hideTextfield
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={handleCategorySubmit}
          >
            Add Category
          </Button>
        <List>{renderCategories()}</List>
      </Container>
      <ConfirmationModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleConfirm={onHandleDelete}
        setObject={setSelectedCategory}
      />
    </>
  );
};

export default Categories;
