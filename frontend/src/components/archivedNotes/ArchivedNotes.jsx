import React, { useEffect, useState } from "react";
import { Button, CardActions, IconButton, Typography } from "@mui/material";
import NotesList from "../notesList/NotesList";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  getCategories,
  getArchiveNotes,
  getArchiveNotesByCategoryName,
  changeStatus,
  deleteNote,
} from "../../api/configRequest";
import { Link } from "react-router-dom";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";

const ArchivedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});

  const linkObject = () => {
    return (
      <Link to="/activeNotes">
        <Button
          id="fade-button"
          aria-controls={true ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={true ? "true" : undefined}
          onClick={() => {}}
        >
          <Typography variant="span" component="p" color="black">
            Return to active notes
          </Typography>
        </Button>
      </Link>
    );
  };

  const renderNotesAPI = () => {
    getArchiveNotes().then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    renderNotesAPI();
    getCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const onHandleRestore = (id) => {
    changeStatus(id)
      .then(() => renderNotesAPI())
      .catch((error) => console.log(error.message));
  };

  const onOpenDeleteModal = (id) => {
    setSelectedNote(notes.filter((note) => note.id === id)[0]);
    setOpenDeleteModal(true);
  };

  const onHandleDelete = () => {
    console.log(selectedNote.id);
    deleteNote(selectedNote.id)
      .then(() => {
        const actualNotes = notes.filter((note) => {
          if (note.id === selectedNote.id) {
            return false;
          } else {
            return true;
          }
        });
        setNotes(actualNotes);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDeleteModal(false);
    setSelectedNote(null);
  };

  const renderActions = ({ id }) => {
    return (
      <CardActions>
        <IconButton onClick={() => onHandleRestore(id)}>
          <RestoreIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => onOpenDeleteModal(id)}>
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
    <>
      <NotesList
        title="Archive Notes"
        notes={notes}
        categories={categories}
        handleChange={handleChange}
        currentCategory={currentCategory}
        renderActions={renderActions}
        linkObject={linkObject}
      />
      <ConfirmationModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleConfirm={onHandleDelete}
        setObject={setSelectedNote}
      />
    </>
  );
};

export default ArchivedNotes;
