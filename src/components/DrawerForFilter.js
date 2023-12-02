import {
  Button,
  Drawer,
  InputBase,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

export default function DrawerForFilter(props) {
  const {
    isDrawerOpen,
    handleDrawerClose,
    fromPrice,
    handleFromPriceChange,
    toPrice,
    handleToPriceChange,
    bed,
    handleBedChange,
    sortOption,
    handleSortOptionChange,
    category,
    handleCategoryChange,
    bath,
    handleBathChange,
  } = props;
  return (
    <Drawer anchor="bottom" open={isDrawerOpen} onClose={handleDrawerClose}>
      <List>
        <ListItem>
          <ListItemText primary="Category" />
          <Select
            multiple
            value={category}
            onChange={handleCategoryChange}
            input={<InputBase />}
          >
            <MenuItem value="townhouse">TownHouse</MenuItem>
            <MenuItem value="individual_house">Individual House</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
          </Select>
        </ListItem>
        <ListItem>
          <ListItemText primary="Price Range" />
          <TextField
            style={{ margin: "0 5px" }}
            type="number"
            label="From"
            value={fromPrice}
            onChange={handleFromPriceChange}
          />
          <TextField
            style={{ margin: "0 5px" }}
            type="number"
            label="To"
            value={toPrice}
            onChange={handleToPriceChange}
          />
        </ListItem>

        <ListItem>
          <ListItemText primary="Bed" />
          <Button
            style={{ margin: "0 5px" }}
            variant={bed === "1" ? "contained" : "outlined"}
            onClick={() => handleBedChange("1")}
          >
            1
          </Button>
          <Button
            style={{ margin: "0 5px" }}
            variant={bed === "2" ? "contained" : "outlined"}
            onClick={() => handleBedChange("2")}
          >
            2
          </Button>
          <Button
            style={{ margin: "0 5px" }}
            variant={bed === "3+" ? "contained" : "outlined"}
            onClick={() => handleBedChange("3+")}
          >
            3+
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Bath" />
          <Button
            style={{ margin: "0 5px" }}
            variant={bath === "1" ? "contained" : "outlined"}
            onClick={() => handleBathChange("1")}
          >
            1
          </Button>
          <Button
            style={{ margin: "0 5px" }}
            variant={bath === "2" ? "contained" : "outlined"}
            onClick={() => handleBathChange("2")}
          >
            2
          </Button>
          <Button
            style={{ margin: "0 5px" }}
            variant={bath === "3+" ? "contained" : "outlined"}
            onClick={() => handleBathChange("3+")}
          >
            3+
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Sort" />
          <Select value={sortOption} onChange={handleSortOptionChange}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="low_price">Low Price</MenuItem>
          </Select>
        </ListItem>
      </List>
    </Drawer>
  );
}
