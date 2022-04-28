import React from 'react';

// Imports from Material UI
import {
   Box,
   Typography,
   Button,
   Card,
   CardMedia,
   CardContent,
   CardActions,
   Chip,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const PlaceDetails = ({ place }) => {
   const classes = useStyles();

   return (
      <Card elevation={6} style={{ width: 300 }}>
         {/* Images of the place */}
         <CardMedia
            style={{ height: 150 }}
            image={
               place.photo
                  ? place.photo.images.large.url
                  : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
            }
            title={place.name}
         />

         {/* Information about the place */}
         <CardContent
>
            <Typography gutterBottom variant="h5">
               {place.name}
            </Typography>

            {/* Price 
            Made an if condition for attractions as they do
            not have prices */}
            { place.price_level ? (
               <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Price</Typography>
                        <Typography gutterBottom variant="subtitle1">
                        {place.price_level}
                        </Typography>
               </Box>     
               ) : ( <div></div> ) }

            {/* Rating */}
            <Box display="flex" justifyContent="space-between">
               <Rating value={Number(place.rating)} readOnly />
               <Typography gutterBottom variant="subtitle1">
                  {place.rating}
               </Typography>
            </Box>

            {/* Ranking */}
            {/* <Box display="flex" justifyContent="space-between">
               <Typography variant="subtitle1">Ranking</Typography>
               <Typography gutterBottom variant="subtitle1">
                  {place.ranking}
               </Typography>
            </Box> */}

            {/* Rewards */}
            {/* {place?.awards?.map((award) => (
               <Box
                  my={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
               >
                  <img src={award.images.small} alt={award.display_name} />
                  <Typography variant="subtitle2" color="textSecondary">
                     {award.display_name}
                  </Typography>
               </Box>
            ))} */}

            {/* Cuisine */}
            {place?.cuisine?.map(({ name }) => (
               <Chip
                  key={name}
                  size="small"
                  label={name}
                  className={classes.chip}
               />
            ))}

            {/* Address */}
            {place?.address && (
               <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                  className={classes.subtitle}
               >
                  <LocationOnIcon />
                  {place.address}
               </Typography>
            )}

            {/* Phone Number */}
            {place?.phone && (
               <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.spacing}
               >
                  <PhoneIcon /> {place.phone}
               </Typography>
            )}

            {/* Buttons to go to external link 
            If there is a url ink of a place, then add buttons to reach
            those links*/}
            {place.web_url ? (
               <CardActions>
                  <Button
                     size="small"
                     color="primary"
                     onClick={() => window.open(place.web_url, '_blank')}
                  >
                     Trip Advisor
                  </Button>
                  <Button
                     size="small"
                     color="primary"
                     onClick={() => window.open(place.website, '_blank')}
                  >
                     Website
                  </Button>
               </CardActions>
            ) : (<div></div>) }
            
         </CardContent>
      </Card>
   );
};

export default PlaceDetails;
