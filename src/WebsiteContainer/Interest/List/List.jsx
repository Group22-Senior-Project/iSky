import React from 'react';

// Imports from Material UI
import {
   Grid,
   InputLabel,
   MenuItem,
   FormControl,
   Select,
} from '@material-ui/core';

import { Stack } from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, placeType, setPlaceType }) => {
   const classes = useStyles();

   return (
      <div className={classes.container}>

         {/* Type Form */}
         <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={placeType} onChange={(e) => setPlaceType(e.target.value)}>
            {/* <Select value={type} onChange={(e) => console.log(e.target.value)}> */}
               <MenuItem value="restaurants">Restaurants</MenuItem>
               {/* <MenuItem value="hotels">Hotels</MenuItem> */}
               <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
         </FormControl>

         {/* Old Grid to render list vertically */}
         {/* <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
               <Grid item key={i} xs={6}>
                  <PlaceDetails place={place} />
               </Grid>
            ))}
         </Grid> */}
         <div className={classes.list}>
            <Stack direction="row" spacing={4}>
               {places?.map((place, i) => (
                  <div key={i}>
                     <PlaceDetails place={place} />
                  </div>
               ))}
            </Stack>
         </div>

      </div>
   );
};

export default List;
