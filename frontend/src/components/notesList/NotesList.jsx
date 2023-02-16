import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

const NotesList = ({
  notes,
  title,
  categories,
  handleChange,
  currentCategory,
  renderActions,
  linkObject = () => {},
  setOpenAddNote = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

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
            {title !== "Active Notes" ? null : (
              <Button onClick={() => setOpenAddNote(true)} variant="contained">
                Add note
              </Button>
            )}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white" }}
            >
              <DensityMediumIcon color="white" />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link to="/">
                  <Button
                    id="fade-button"
                    aria-controls={true ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={true ? "true" : undefined}
                    onClick={() => {}}
                  >
                    <Typography variant="p" component="p" color="black">
                      HOME
                    </Typography>
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem>{linkObject()}</MenuItem>
              <MenuItem>
                <Button
                  id="fade-button"
                  aria-controls={true ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={true ? "true" : undefined}
                  onClick={handleLogOut}
                >
                  <Typography variant="p" component="p" color="black">
                    Log Out
                  </Typography>
                </Button>
              </MenuItem>
            </Menu>
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
