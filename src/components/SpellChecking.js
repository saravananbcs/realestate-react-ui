import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";

export default function SpellChecking(props) {
  const { data, spellCheckingWords, handleDoYouMeanClick } = props;
  return (
    data.length > 0 &&
    spellCheckingWords && (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <SpellcheckIcon sx={{ mr: 2 }} />
            <Typography>Spell Checking</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <Button
                key={spellCheckingWords}
                variant="outlined"
                onClick={() => handleDoYouMeanClick(spellCheckingWords)}
                style={{ margin: "5px", minWidth: "auto" }}
              >
                {spellCheckingWords}
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </>
    )
  );
}
