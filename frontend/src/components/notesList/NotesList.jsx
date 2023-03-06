import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MenuButton from "../menuButton/MenuButton";
import SearchBar from "../searchBar";

const NotesList = ({
  notes,
  title,
  categories,
  renderActions,
  linkObject = () => {},
  setOpen = () => {},
}) => {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");

  const handleSearch = () => {
    let filtered = notes;
    if (searchOption === "name") {
      filtered = notes.filter((note) =>
        note.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchOption === "content") {
      filtered = notes.filter((note) =>
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchOption === "category") {
      filtered = notes.filter((note) =>
        note.categories.some((category) => category.name === searchTerm)
      );
    }
    setFilteredNotes(filtered);
  };

  const handleClickAdd = () => {
    setOpen(true);
  };

  const renderNotes = () => {
    if (filteredNotes.length === 0) {
      return (
        <Grid item>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              There is no notes here
            </Typography>
            <Icon fontSize="large">
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Icon>
          </Box>
        </Grid>
      );
    }
    return filteredNotes.map((note, index) => (
      <Grid item xs={7} sm={6} md={4} lg={4} key={index}>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Card sx={{ minWidth: 260 }} raised>
            <CardContent>
              <AssignmentRoundedIcon />
              <Typography variant="h4" component="div">
                {note.name}
              </Typography>
              <Typography variant="p" component="div">
                {`Last updated: ${note.updatedAt}`}
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                {renderActions(note)}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    ));
  };

  useEffect(() => {
    let filteredNotes = notes;
  
    if (searchOption === "name") {
      filteredNotes = notes.filter((note) =>
        note.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchOption === "content") {
      filteredNotes = notes.filter((note) =>
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchOption === "category" && searchTerm !== "") {
      filteredNotes = notes.filter((note) =>
        note.categories.some((category) => category.name === searchTerm)
      );
    }
  
    setFilteredNotes(filteredNotes);
  }, [notes,searchTerm, searchOption]); 

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {title !== "Active Notes" ? null : (
              <Button onClick={handleClickAdd} variant="contained">
                Add note
              </Button>
            )}
            <MenuButton linkObject={linkObject} />
          </Toolbar>
        </AppBar>
      </Box>
      <SearchBar
        onSearch={handleSearch}
        categories={categories}
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm}
        searchOption = {searchOption}
        setSearchOption = {setSearchOption}
      />
      <Container>
        <Grid
          container
          spacing={16}
          justify="flex-start"
          justifyContent="center"
          alignItems="center"
        >
          {renderNotes()}
        </Grid>
      </Container>
      <nav></nav>
    </Container>
  );
};

export default NotesList;
