import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DoYouMean(props) {
  const { data, doYouMean, handleDoYouMeanClick } = props;
  return (
    data.length > 0 &&
    doYouMean.length > 0 && (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <TipsAndUpdatesIcon sx={{ mr: 2 }} />
            <Typography>Do you mean</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {doYouMean.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleDoYouMeanClick(suggestion)}
                  style={{ margin: "5px", minWidth: "auto" }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </>
    )
  );
}
