import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import Form from "../form/Form";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const { setError, formState: { errors }, clearErrors } = useForm();

  const mapStringsToCategories = (categories) => {
    return categories.map((category) => 
      {return { name: category }}
    )
  }

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
    createCategory(newCategory).then(((response) => {
      setCategories([...categories, response.data]);
    }).catch(error => {
      const {status, messages} = error.response.data;
      if(status === 422) {
        for(let field in messages) {
          setError('category', {message: messages[field]});
        }
      console.log("Errors: ", errors);
      }
    }));
  };

  const onOpenDeleteModal = (id) => {
    setSelectedNote(notes.filter((note) => note.id === id)[0]);
    setOpenDeleteModal(true);
  };

  const onHandleDelete = () => {
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
    const DBCategories = mapStringsToCategories(formData.categories);
    formData.categories = DBCategories;
    updateNote(formData, formData.id).then(() => {
      const actualNotes = notes.map((note) => {
        if (note.id === formData.id) {
          return formData;
        } else {
          return note;
        }
      });
      setNotes(actualNotes);
      setSelectedNote(null);
      setOpenForm(false);
    }).catch(error => {
      console.log(error)
    });
    
  };

  const handleSubmitCreation = (data) => {
    const DBCategories = mapStringsToCategories(data.categories);
    data.categories = DBCategories;
    createNote(data).then(() => {
      setNotes([...notes,data]);
      clearErrors();
      setOpenForm(false);
    }).catch(error => {
      const {status, messages} = error.response.data;
      if(status === 422) {
        for(let field in messages) {
          setError(field, {message: messages[field]});
        }
        console.log("Errors: ", errors)
      }else console.log(error);
    });
  };

  const renderForm = () => {
    if(openForm){
      return <Form
        data={selectedNote ? selectedNote : undefined }
        openForm={openForm}
        setOpenModalForm={setOpenForm}
        setSelectedNote={setSelectedNote}
        allCategories={categories}
        onSubmit={selectedNote ? onHandleSubmit : handleSubmitCreation}
        onClickAddCategory={onClickAddCategory}
        errorsSystem={{errors: errors, clearErrors: clearErrors }}
      />
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
    } else if(!openForm) {
      getActiveNotes().then(response => setNotes(response.data))
    }
  }, [currentCategory, openForm]);

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
        setOpen={setOpenForm}
      />
      {renderForm()}
      <ConfirmationModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleConfirm={onHandleDelete}
        setObject={setSelectedNote}
      />
    </>
  );
};

export default ActiveNotes;
