import React, { useEffect, useState } from "react";
import {
  CardActions,
  IconButton,
} from "@mui/material";
import NotesList from "../notesList/NotesList";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  getCategories,
  getActiveNotes,
  getActiveNotesByCategoryName,
} from "../../api/configRequest";

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    getActiveNotes().then((response) => {
      setNotes(response.data);
    });
    getCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);
  const renderActions = () => {
    return (
      <CardActions>
        <IconButton>
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
    <NotesList notes={notes} categories={categories} handleChange={handleChange} currentCategory={currentCategory} renderActions={renderActions}/>
  );
};

export default ActiveNotes;
