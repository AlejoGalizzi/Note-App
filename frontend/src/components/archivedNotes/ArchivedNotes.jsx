import React, { useEffect, useState } from "react";
import { CardActions, IconButton } from "@mui/material";
import NotesList from "../notesList/NotesList";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RestoreIcon from '@mui/icons-material/Restore';
import {
  getCategories,
  getArchiveNotes,
  getArchiveNotesByCategoryName,
  changeStatus,
} from "../../api/configRequest";

const ArchivedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    getArchiveNotes().then((response) => {
      setNotes(response.data);
    });
    getCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const onHandleRestore = (id) => {
    changeStatus(id);
  }

  const renderActions = (id) => {
    return (
      <CardActions>
        <IconButton action={() => onHandleRestore(id)}>
          <RestoreIcon fontSize="large" />
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
      getArchiveNotesByCategoryName(currentCategory).then((response) => {
        setNotes(response.data);
      });
    } else
      getArchiveNotes().then((response) => {
        setNotes(response.data);
      });
  }, [currentCategory]);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  return (
    <NotesList
      title="Archive Notes"
      notes={notes}
      categories={categories}
      handleChange={handleChange}
      currentCategory={currentCategory}
      renderActions={renderActions}
    />
  );
};

export default ArchivedNotes;
