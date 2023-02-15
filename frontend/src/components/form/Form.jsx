import React, { useState } from "react";
import {
  Button,
  Dialog,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

const Form = ({
  data = {
    id: 0,
    name: "",
    content: "",
    categories: [],
    updatedAt: Date.now(),
  },
  handleSubmit = () => {},
  openForm = null,
  setOpenForm = () => {},
  allCategories = [],
  onClickAddCategory = () => {}
}) => {
  const [formData, setFormData] = useState(data);
  const [newCategory, setNewCategory] = useState('')

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      const checkedValue = event.target.checked;
      const categoryValue = event.target.value;
      let newCategories = formData.categories;

      if (checkedValue) {
        newCategories = [...newCategories, {name: categoryValue}];
      } else {
        newCategories = newCategories.filter((category) => category.name !== categoryValue);
      }

      setFormData({ ...formData, categories: newCategories });

    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const renderCheckboxes = () => {
    return allCategories.map((category, index) => (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={formData.categories.some(
              (cat) => cat.hasOwnProperty("name") && cat.name === category.name
            )}
            onChange={handleChange}
            name={category.name}
            value={category.name}
          />
        }
        label={category.name}
      />
    ));
  };

  return (
    <Dialog
      open={openForm}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="xl"
    >
      <DialogTitle id="form-dialog-title">Create/Edit Note</DialogTitle>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(formData)}}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            rows={7}
            multiline
            fullWidth
            value={formData.content}
            onChange={handleChange}
            size="medium"
          />
          <FormGroup>{renderCheckboxes()}</FormGroup>
          <TextField
            margin="dense"
            name="add-category"
            label="Add Category"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            size="medium"
          />
          <Button color="primary" variant="contained" onClick={() => {
            onClickAddCategory(newCategory)
            setNewCategory('');
            }}>Add Category</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
