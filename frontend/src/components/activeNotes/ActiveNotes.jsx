import React, { useEffect, useState } from "react";
import { Button, CardActions, IconButton, Typography } from "@mui/material";
import NotesList from "../notesList/NotesList";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  getCategories,
  getActiveNotes,
  getActiveNotesByCategoryName,
  changeStatus,
} from "../../api/configRequest";
import { Link } from "react-router-dom";

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [openForm, setOpenForm] = useState(false);

  const style = { whiteSpace: 'normal', wordWrap: 'break-word'}

  const linkObject = () => {
    return (
      <Link to="/archiveNotes">
        <Button
          id="fade-button"
          aria-controls={true ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={true ? "true" : undefined}
          onClick={() => {}}
        >
          <Typography variant="subtitle1" noWrap style={{fontSize: '0.9em', ...style}}  color="black">Go to archive notes</Typography>
        </Button>
      </Link>
    );
  };

  const renderNotesAPI = () => {
    getActiveNotes().then((response) => {
      setNotes(response.data);
    });
  }

  useEffect(() => {
    renderNotesAPI();
    getCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const onHandleArchive = (id) => {
    changeStatus(id).then(() => renderNotesAPI()).catch(error => console.log(error.message));
  }

  const handleClickEdit = () => {
    setOpenForm(true);
  };

  const renderActions = (id) => {
    return (
      <CardActions>
        <IconButton onClick={() => onHandleArchive(id)}>
          <Inventory2RoundedIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <EditRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <DeleteRoundedIcon fontSize="large" />
        </IconButton>
      </CardActions>
    );
  };

  useEffect(() => {
    if (currentCategory !== "All") {
      getActiveNotesByCategoryName(currentCategory).then((response) => {
        setNotes(response.data);
      });
    } else
      getActiveNotes().then((response) => {
        setNotes(response.data);
      });
  }, [currentCategory]);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  return (
    <NotesList
      title="Active Notes"
      notes={notes}
      categories={categories}
      handleChange={handleChange}
      currentCategory={currentCategory}
      renderActions={renderActions}
      linkObject={linkObject}
    />
  );
};

export default ActiveNotes;
