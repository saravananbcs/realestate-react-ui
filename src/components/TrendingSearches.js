import React from "react";
import { Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import Badge from "@mui/material/Badge";

export default function TrendingSearches(props) {
  const { trendingSearches, handleTrendingSearchesClick } = props;
  console.log("trendingSearches");
  console.log(trendingSearches);
  return (
    trendingSearches.length > 0 && (
      <>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <TrendingUpIcon sx={{ mr: 2 }} />
          {trendingSearches.map((suggestion, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleTrendingSearchesClick(suggestion.key)}
              style={{ margin: "5px", minWidth: "auto" }}
            >
              <Badge
                badgeContent={suggestion.count}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                style={{
                  marginRight: "20px",
                  marginLeft: "8px",
                  minWidth: "auto",
                }}
              ></Badge>
              {suggestion.key}
            </Button>
          ))}
        </div>
      </>
    )
  );
}
