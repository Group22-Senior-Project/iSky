import React from 'react';

// Imports from Material UI
import {
   Typography,
   Card,
   CardContent,
} from '@material-ui/core';

import useStyles from './styles';

const WeatherDetails = ({ historicalWeekDataArr }) => {
   const classes = useStyles();

   // converts the datetime in an array element to a date object 
   // then converts it to MM - DD - YYYY format
   const time = historicalWeekDataArr.dt * 1000;
   const timeString = new Date(time);
   const monthDayYear = (timeString.getMonth() + 1) + ' - ' + timeString.getDate() + ' - ' + (timeString.getFullYear() + 1) ;
   // console.log(monthDayYear);

   // Rounds the temperature 
   const tempRounded = Math.round(historicalWeekDataArr.main.temp);

   return (
      <Card elevation={6} style={{ width: 200 }}>

         {/* Weather information */}
         <CardContent>
            <Typography gutterBottom variant="h5">
               {monthDayYear}
            </Typography>
            <Typography gutterBottom variant="h5">
               {tempRounded}ºF
            </Typography>
         </CardContent>
      </Card>
   );
};

export default WeatherDetails;
