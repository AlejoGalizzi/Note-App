import React from "react";
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

const NotesList = ({
  notes,
  title,
  categories,
  handleChange,
  currentCategory,
  renderActions,
  linkObject = () => {},
  setOpen = () => {},
}) => {
  const handleClickAdd = () => {
    setOpen(true);
  };

  const renderNotes = () => {
    if (notes.length === 0) {
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

    return notes.map((note, index) => (
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

  const renderOptions = () => {
    const categoriesItem = categories.map((category, index) => (
      <MenuItem value={category.name} key={index}>
        {category.name}
      </MenuItem>
    ));
    categoriesItem.unshift(
      <MenuItem value={"All"} key={-1}>
        All
      </MenuItem>
    );
    return categoriesItem;
  };

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
      <FormControl
        fullWidth
        style={{
          marginTop: "20px",
        }}
      >
        <InputLabel htmlFor="category-input">Category filter:</InputLabel>
        <Select
          labelId="category-input"
          id="category-input"
          value={currentCategory}
          label="categoryName"
          onChange={handleChange}
        >
          {renderOptions()}
        </Select>
      </FormControl>
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
