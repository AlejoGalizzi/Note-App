import { Dialog, List } from "@mui/material";
import React, { useState } from "react";
import { getCategories } from "../../api/configRequest";
import { Actions } from "../../constants/FormAction";

const Form = ({
  formData = {
    name: "",
    content: "",
    categories: [],
  },
  action = Actions.CREATE,
  handleSubmit = () => {},
  openForm,
  setOpenForm,
  allCategories = [],
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState(formData);
  const [categoriesChecked, setCategoriesChecked] = useState(() => {
    allCategories.map((category) => {
      return {
        name: category.name,
        isChecked: formData.categories.includes(category),
      };
    });
  });

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <IconButton>
        <EditRoundedIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={openForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create/Edit Note</DialogTitle>
        <form onSubmit={handleSubmit}>
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
              name="contet"
              label="Content"
              type="text"
              fullWidth
              value={formData.content}
              onChange={handleChange}
            />
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {getListCategories().map((category) => {
                const labelId = `checkbox-list-secondary-label-${category.id}`;
                return (
                  <ListItem
                    key={category.id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(category)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={`Line item ${value + 1}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
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
    </div>
  );
};

export default Form;
