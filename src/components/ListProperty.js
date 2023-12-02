import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import BedIcon from "@mui/icons-material/Bed";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import MapIcon from "@mui/icons-material/Map";
import BathtubIcon from "@mui/icons-material/Bathtub";
import RentalInfo from "./RentalInfo";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const getRandomValue = () => Math.floor(Math.random() * 3) + 1;

export default function ListProperty(props) {
  const {
    data,
    startIndex,
    endIndex,
    handleRegexClickOnCityAndZipcode,
    country,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [clickedId, setClickedId] = useState("");

  const handleInnerHtmlClick = (event) => {
    const targetId = event.target.id;
    if (targetId === "zipCodeFound") {
      handleZipClick(event);
    } else if (targetId === "cityNameFound") {
      handleCityClick(event);
    }
  };
  const handleCityClick = (event) => {
    console.log(event.target.innerText);
    handleRegexClickOnCityAndZipcode(event.target.innerText);
  };

  const handleZipClick = (event) => {
    console.log(event.target.value);
    handleRegexClickOnCityAndZipcode(event.target.innerText);
  };
  return (
    data.length > 0 && (
      <Grid container spacing={4} style={{ marginTop: "5px" }}>
        {data.slice(startIndex, endIndex).map((property) => (
          <Grid item key={property._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image={property.img_urls[0]}
              />
              <CardContent sx={{ flexGrow: 1, padding: "8px" }}>
                <Typography
                  onClick={handleInnerHtmlClick}
                  dangerouslySetInnerHTML={{ __html: property.title }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "12px",
                    margin: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SellIcon sx={{ mr: 1 }} />
                    <span>
                      {country === "canada" || country === "us"
                        ? "$ "
                        : country === "uae"
                        ? "AED "
                        : ""}
                      {property.price}
                    </span>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BedIcon sx={{ mr: 1 }} />
                    <span>{property.bed || getRandomValue()}</span>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BathtubIcon sx={{ mr: 1 }} />
                    <span>{property.bath || getRandomValue()}</span>
                  </div>
                </div>
              </CardContent>
              {property.desc && (
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    onClick={handleInnerHtmlClick}
                    dangerouslySetInnerHTML={{ __html: property.desc }}
                  />
                </CardContent>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  fontSize: "12px",
                  margin: "0px 18px 18px 18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    alignItems: "center",
                  }}
                >
                  <Link to={`mailto:${property.email}`}>
                    <Button
                      size="small"
                      style={{
                        display: "flex",
                        flex: "1",
                        alignItems: "center",
                      }}
                    >
                      <EmailIcon sx={{ mr: 1 }} style={{ color: "green" }} />
                    </Button>
                  </Link>
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    alignItems: "center",
                  }}
                >
                  <Link to={`tel:${property.ph_number}`}>
                    <Button
                      size="small"
                      style={{
                        display: "flex",
                        flex: "1",
                        alignItems: "center",
                      }}
                    >
                      <CallIcon sx={{ mr: 1 }} style={{ color: "#00B98E" }} />
                    </Button>
                  </Link>
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    alignItems: "center",
                  }}
                >
                  <Link
                    target="_blank"
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      property.title
                    )}`}
                  >
                    <Button
                      size="small"
                      style={{
                        display: "flex",
                        flex: "1",
                        alignItems: "center",
                      }}
                    >
                      <MapIcon sx={{ mr: 1 }} style={{ color: "#fa6400" }} />
                    </Button>
                  </Link>
                </div>

                <Button
                  size="small"
                  style={{
                    display: "flex",
                    flex: "1",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setOpenModal(true);
                    setClickedId(property.id);
                  }}
                >
                  View
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
        {clickedId && (
          <RentalInfo
            open={openModal}
            handleClose={() => {
              setOpenModal(false);
              setClickedId("");
            }}
            rentalData={
              clickedId && data.filter((prop) => prop.id === clickedId)
            }
          />
        )}
      </Grid>
    )
  );
}
