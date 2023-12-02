import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import RentalInfo from "./RentalInfo";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TrendingHouses(props) {
  const { trendingHouses } = props;

  const [openModal, setOpenModal] = useState(false);
  const [clickedId, setClickedId] = useState("");

  return (
    trendingHouses.length > 0 && (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <TrendingUpIcon sx={{ mr: 2 }} />
            <Typography>Trending Houses</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              {trendingHouses.map((house) => (
                <Grid item key={house.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 0,
                        paddingTop: "56.25%",
                      }}
                      image={house.img_urls[0]}
                    />
                    <CardContent>
                      <Typography>{house.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {house.city}, {house.country}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        style={{
                          display: "flex",
                          flex: "1",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setOpenModal(true);
                          setClickedId(house.id);
                        }}
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
        {clickedId && (
          <RentalInfo
            open={openModal}
            handleClose={() => {
              setOpenModal(false);
              setClickedId("");
            }}
            rentalData={
              clickedId &&
              trendingHouses.filter((prop) => prop.id === clickedId)
            }
          />
        )}
      </>
    )
  );
}
