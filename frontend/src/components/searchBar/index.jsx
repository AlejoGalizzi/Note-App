import { makeStyles } from "@material-ui/core";
import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./searchBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SearchBar = ({
  onSearch = () => {},
  categories = [],
  searchTerm = "",
  searchOption = "name",
  setSearchTerm = () => {},
  setSearchOption = () => {}
}) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  const handleSearch = () => {
    if (searchOption === "category") {
      onSearch(searchTerm, searchOption);
    } else {
      onSearch(searchTerm, searchOption);
    }
    setIsFocused(false);  
  };

  const handleSelect = (event) => {
    setSearchOption(event.target.value);
    setSearchTerm("");
  };

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      ref.current.blur();
    }
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <MenuItem key={category.name} value={category.name}>
        {category.name}
      </MenuItem>
    ));
  };

  return (
    <form className={classes.root} onSubmit={() => setIsFocused(false)}>
      <TextField
        id="search-category"
        select
        label="Search by"
        value={searchOption}
        onChange={handleSelect}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="content">Content</MenuItem>
        <MenuItem value="category">Category</MenuItem>
      </TextField>
      {searchOption === "category" ? (
        <TextField
          id="category-select"
          select
          label="Category"
          value={searchTerm}
          onChange={handleTermChange}
          onBlur={handleSearch}
          inputRef={ref}
          inputProps={{ onKeyDown: handleKeyDown }}
        >
          {renderCategories()}
        </TextField>
      ) : (
        <TextField
          id="search-term"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleTermChange}
          onBlur={handleSearch}
          inputRef={ref}
          inputProps={{ onKeyDown: handleKeyDown }}
        />
      )}
    </form>
  );
};

export default SearchBar;
