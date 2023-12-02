import { Box, Button } from "@mui/material";
import React from "react";

export default function Pagination(props) {
  const { totalPages, currentPage, pagesToShow, handlePageChange } = props;
  return (
    totalPages > 1 && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {Array.from({ length: totalPages }).map((_, index) => {
          // Only render buttons for the current page, the next 2 pages, and the previous 2 pages
          if (
            index + 1 === currentPage ||
            (index + 1 >= currentPage - pagesToShow &&
              index + 1 <= currentPage + pagesToShow)
          ) {
            return (
              <Button
                style={{ margin: "5px" }}
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
              >
                {index + 1}
              </Button>
            );
          }
          return null;
        })}
      </Box>
    )
  );
}
