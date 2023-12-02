import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  House as HouseIcon,
  MonetizationOn as MonetizationOnIcon,
  KingBed as KingBedIcon,
  Bathtub as BathtubIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Link as LinkIcon,
} from "@mui/icons-material";

export default function RentalInfo(props) {
  const { open, handleClose, rentalData } = props;
  const {
    city,
    country,
    type,
    website,
    price,
    bed,
    bath,
    title,
    desc,
    numberOfVisits,
    email,
    ph_number,
    img_urls,
  } = rentalData[0];

  return (
    rentalData && (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography dangerouslySetInnerHTML={{ __html: title }} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {/* Left side content */}
              <Paper elevation={3} style={{ padding: "10px" }}>
                {img_urls.map((imgUrl, index) => (
                  <img src={imgUrl} alt={`${index}`} width="100%" />
                ))}
                <Divider />
                <Typography variant="h6">Details</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={`City: ${city}, ${country}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HouseIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Type: ${type}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MonetizationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Price: ${price}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <KingBedIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Bedrooms: ${bed}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BathtubIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Bathrooms: ${bath}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VisibilityIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Number of Visits: ${numberOfVisits}`}
                    />
                  </ListItem>
                </List>
                <Divider />
                <Typography variant="h6">Contact Information</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Email: ${email}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Phone Number: ${ph_number}`} />
                  </ListItem>
                </List>
                <Divider />
                <Typography variant="h6">Links</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href={website} target="_blank" rel="noopener">
                          View on Website
                        </Link>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            {desc && (
              <Grid item xs={12} sm={12}>
                {/* Right side content */}
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6">Description</Typography>
                  <Typography dangerouslySetInnerHTML={{ __html: desc }} />
                </Paper>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
