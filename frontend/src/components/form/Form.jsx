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
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ColorPicker } from "material-ui-color";

const Form = ({
  data = {
    id: 0,
    name: "",
    content: "",
    categories: [],
    updatedAt: Date.now(),
  },
  onSubmit = () => {},
  openForm = false,
  setOpenModalForm = () => {},
  allCategories = [],
  setSelectedNote = () => {},
  onClickAddCategory = () => {},
  errorsSystem = {},
}) => {
  const [formData, setFormData] = useState(data);
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("#808080");
  const { errors, clearErrors } = errorsSystem;

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      id: formData.id,
      name: formData.name,
      content: formData.content,
      categories: formData.categories,
      updatedAt: formData.updatedAt,
    },
  });

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      const checkedValue = event.target.checked;
      const categoryValue = event.target.value;
      let newCategories = formData.categories;

      if (checkedValue) {
        newCategories = [...newCategories, { name: categoryValue }];
      } else {
        newCategories = newCategories.filter(
          (category) => category.name !== categoryValue
        );
      }

      setFormData({ ...formData, categories: newCategories });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  const handleCategorySubmit = () => {
    onClickAddCategory({ name: newCategory, color: newColor });
    if (!errors["category"]) {
      setNewColor("#808080");
      setNewCategory("");
      clearErrors("category");
    }
  }

  const handleClose = () => {
    clearErrors();
    setSelectedNote(null);
    setOpenModalForm(false);
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
            value={category.name}
            name={category.name}
            {...register("categories", { onChange: handleChange })}
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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            error={errors && errors["name"] ? true : false}
            autoFocus
            margin="dense"
            // name="name"
            label="Name"
            type="text"
            fullWidth
            value={watch("name") || ""}
            onChange={handleChange}
            {...register("name")}
            helperText={
              errors && errors["name"] ? errors["name"].message : null
            }
          />
          <TextField
            error={errors && errors["content"] ? true : false}
            margin="dense"
            // name="content"
            label="Content"
            type="text"
            rows={7}
            multiline
            fullWidth
            value={watch("content") || ""}
            onChange={handleChange}
            size="medium"
            helperText={
              errors && errors["content"] ? errors["content"].message : null
            }
            {...register("content")}
          />
          <FormGroup>{renderCheckboxes()}</FormGroup>
          <TextField
            error={errors && errors["category"] ? true : false}
            margin="dense"
            name="category"
            label="Add Category"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            size="medium"
            helperText={
              errors && errors["category"] ? errors["category"].message : null
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ColorPicker
                    defaultValue={"gray"}
                    value={newColor}
                    onChange={(color) => setNewColor(color.css.backgroundColor)}
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
