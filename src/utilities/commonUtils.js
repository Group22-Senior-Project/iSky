import Home from '../WebsiteContainer/Home/Home';
import Maps from '../WebsiteContainer/Maps/Maps';
import Weather from '../WebsiteContainer/Weather/Weather';
import Corona from '../WebsiteContainer/Corona/Corona';
import Interest from '../WebsiteContainer/Interest/Interest';

// Array to keep a list of our screens
export const TOTAL_SCREENS = [
   {
      screen_name: 'Home',
      component: Home,
   },
   {
      screen_name: 'Map',
      component: Maps,
   },
   {
      screen_name: 'Interest',
      component: Interest,
   },
   {
      screen_name: 'Weather',
      component: Weather,
   },
   {
      screen_name: 'COVID-19',
      component: Corona,
   },
];

// Function to get the screen name
export const GET_SCREEN_INDEX = (screen_name) => {
   if (!screen_name) {
      return -1;
   }

   for (let i = 0; i < TOTAL_SCREENS.length; i++) {
      if (TOTAL_SCREENS[i].screen_name === screen_name) {
         return i;
      }
   }
   return -1;
};
