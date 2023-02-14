import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const NotesList = ({notes, title, categories, handleChange, currentCategory, renderActions}) => {

  const renderNotes = () => {
    if (notes.length === 0) {
      return (
        <div>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">There is no notes yet.</Typography>
          </Box>
        </div>
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
                {renderActions(note.id)}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    ));
  };

  const renderOptions = () => {
    const categoriesItem = categories.map((category) => (
      <MenuItem value={category.name}>{category.name}</MenuItem>
    ));
    categoriesItem.unshift(<MenuItem value={"All"}>All</MenuItem>);
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
            <Link to="/">
              <Button
                id="fade-button"
                aria-controls={true ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={true ? "true" : undefined}
                onClick={() => {}}
              >
                <Typography variant="h6" component="p" color="white">
                  HOME
                </Typography>
              </Button>
            </Link>
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
        <Grid container spacing={16} justify="flex-start">
          {renderNotes()}
        </Grid>
      </Container>
      <nav></nav>
    </Container>
  );
};

export default NotesList;
