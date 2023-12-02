import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";

import Badge from "@mui/material/Badge";
export default function FilterByWebsite(props) {
  const { listOfRentals, searchFrequency, filterDataByDomain } = props;
  return (
    listOfRentals.length > 0 &&
    searchFrequency != null && (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TuneIcon sx={{ mr: 2 }} />
          <Typography>Filter by Sites</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              alignItems: "center",
            }}
          >
            {Object.entries(searchFrequency).map(([domain, count]) => (
              // <Typography>{`${domain} :  ${count} results `}</Typography>

              <Button
                key={count}
                variant="outlined"
                onClick={() => filterDataByDomain(domain)}
                style={{ margin: "5px", minWidth: "auto" }}
              >
                <Badge
                  badgeContent={count}
                  color="primary"
                  style={{
                    marginRight: "20px",
                    marginLeft: "8px",
                    minWidth: "auto",
                  }}
                ></Badge>

                {`${domain.replace(/^www\./, "").replace(/\.com$/, "")}`}
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    )
  );
}
