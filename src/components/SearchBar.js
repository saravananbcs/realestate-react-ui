import {
  Autocomplete,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ListItem, ListItemText, MenuItem, Select } from "@mui/material";
export default function SearchBar(props) {
  const {
    setIsDrawerOpen,
    listSuggestions,
    openSuggestion,
    setOpenSuggestion,
    searchValue,
    loadingAPI,
    handleSearch,
    setSearchValue,
    loading,
    autoCompleteRecommend,
    handleInputChange,
    handleCountryChange,
    countryChange,
  } = props;
  let autocompleteval = "";
  if (
    autoCompleteRecommend &&
    autoCompleteRecommend[0] &&
    autoCompleteRecommend[0].includes(searchValue)
  ) {
    autocompleteval = autoCompleteRecommend[0];
  }
  return (
    <Paper
      component="form"
      sx={{
        p: "12px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "20px 0",
      }}
    >
      <IconButton
        sx={{ p: "10px" }}
        aria-label="menu"
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <Autocomplete
        id="searchSection"
        options={listSuggestions}
        sx={{ width: "100%" }}
        open={openSuggestion}
        onOpen={() => {
          if (searchValue !== "") {
            setOpenSuggestion(true);
          }
        }}
        disableClearable
        freeSolo
        onClose={() => {
          setOpenSuggestion(false);
        }}
        getOptionLabel={(option) => (option && option.title) || searchValue}
        loading={loadingAPI}
        onChange={() => {}}
        onInputChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default behavior
            handleSearch();
          }
        }}
        autoHighlight={false}
        renderOption={(props, option) => {
          return (
            <>
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
                onClick={(event) => {
                  setSearchValue(event.target.value);
                  handleSearch();
                }}
              >
                <img
                  loading="lazy"
                  width="50"
                  srcSet={option.imageUrls[0]}
                  src={option.imageUrls[0]}
                  alt=""
                />
                {option.title}
              </Box>
            </>
          );
        }}
        renderInput={(params) => (
          <>
            <Box sx={{ position: "relative" }}>
              <TextField
                {...params}
                label="Search a Rental"
                // onInput={(event) => {
                //   setSearchValue(event.target.value);
                // }}
                onKeyDown={(event) => {
                  setSearchValue(event.target.value);
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                sx={{
                  "& input": { width: "auto", marginRight: "8px" },
                  "& .MuiAutocomplete-clearIndicator": {
                    display: "none",
                  },
                }}
              />

              {/* Absolute positioned TextField */}
              <TextField
                //   label="Suggestion"
                //   variant="outlined"
                value={autocompleteval || ""}
                disabled
                fullWidth
                //   margin="normal"
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "9px", // Adjust the right position as needed
                  pointerEvents: "none", // Make the TextField non-interactive
                  "& fieldset": { border: "none" },

                  // visibility: 'hidden', // Hide the element
                  // borderColor: "white",
                  // border: 'none', // Remove borders
                }}
              />
            </Box>
          </>
        )}
      />
      <Select
        value={countryChange}
        onChange={handleCountryChange}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <MenuItem value="canada">Canada</MenuItem>
        <MenuItem value="us">US</MenuItem>
        <MenuItem value="uae">UAE</MenuItem>
      </Select>
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
