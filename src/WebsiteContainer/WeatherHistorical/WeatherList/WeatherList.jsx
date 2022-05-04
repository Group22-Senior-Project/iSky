import React from 'react';

import { Stack } from '@mui/material';

import WeatherDetails from '../WeatherDetails/WeatherDetails';

import useStyles from './styles';

const WeatherList = ({ historicalWeekDataArr }) => {
   const classes = useStyles();

   return (
      <div className={classes.container}>

         <div className={classes.list}>
            <Stack direction="row" spacing={4}>
               {historicalWeekDataArr?.map((historicalWeekDataArr, i) => (
                  <div key={i}>
                     <WeatherDetails historicalWeekDataArr={historicalWeekDataArr} />
                  </div>
               ))}
            </Stack>
         </div>

      </div>
   );
};

export default WeatherList;
