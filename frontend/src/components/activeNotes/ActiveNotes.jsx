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
  createCategory,
  updateNote,
  deleteNote,
  createNote,
} from "../../api/configRequest";
import { Link } from "react-router-dom";
import Form from "../form/Form";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [openFormEdit, setOpenForm] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});

  const style = { whiteSpace: "normal", wordWrap: "break-word" };

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
          <Typography
            variant="subtitle1"
            noWrap
            style={{ fontSize: "0.9em", ...style }}
            color="black"
          >
            Go to archive notes
          </Typography>
        </Button>
      </Link>
    );
  };

  const renderNotesAPI = () => {
    getActiveNotes().then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    renderNotesAPI();
    getCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const onHandleArchive = (id) => {
    changeStatus(id)
      .then(() => renderNotesAPI())
      .catch((error) => console.log(error.message));
  };

  const handleClickEdit = (note) => {
    setSelectedNote(note);
    setOpenForm(true);
  };

  const onClickAddCategory = (newCategory) => {
    createCategory(newCategory).then(() => {
      setCategories([...categories, { name: newCategory }]);
    });
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

  const onHandleSubmit = (formData) => {
    updateNote(formData, formData.id).then(() => {
      const actualNotes = notes.map((note) => {
        if (note.id === formData.id) {
          return formData;
        } else {
          return note;
        }
      });
      setNotes(actualNotes);
    });
    setOpenForm(false);
  };

  const handleSubmitCreation = (formData) => {
    createNote(formData).then(() => {
      setNotes([...notes,formData]);
      setOpenAddNote(false);
    });
    setOpenAddNote(false);
  };

  const renderForm = () => {
    if (openFormEdit) {
      return (
        <Form
          data={selectedNote}
          openForm={openFormEdit}
          setOpenForm={setOpenForm}
          allCategories={categories}
          handleSubmit={onHandleSubmit}
          onClickAddCategory={onClickAddCategory}
        />
      );
    }else if(openAddNote) {
      return (
        <Form
          openForm={openAddNote}
          setOpenForm={setOpenAddNote}
          allCategories={categories}
          handleSubmit={handleSubmitCreation}
          onClickAddCategory={onClickAddCategory}
        />
      );
    }else return null;
  };

  const renderActions = (note) => {
    return (
      <CardActions>
        <IconButton onClick={() => onHandleArchive(note.id)}>
          <Inventory2RoundedIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => handleClickEdit(note)}>
          <EditRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => onOpenDeleteModal(note.id)}>
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
    } else if(!openAddNote && !openFormEdit) {
      getActiveNotes().then(response => setNotes(response.data))
    }
  }, [currentCategory, openAddNote, openFormEdit]);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  return (
    <>
      <NotesList
        title="Active Notes"
        notes={notes}
        categories={categories}
        handleChange={handleChange}
        currentCategory={currentCategory}
        renderActions={renderActions}
        linkObject={linkObject}
        setOpenAddNote={setOpenAddNote}
      />
      {renderForm()}
      <ConfirmationModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleConfirm={onHandleDelete}
        setNote={setSelectedNote}
      />
    </>
  );
};

export default ActiveNotes;
