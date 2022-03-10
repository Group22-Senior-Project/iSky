import Home from '../PortfolioContainer/Home/Home';
import Maps from '../PortfolioContainer/Maps/Maps';
import Weather from '../PortfolioContainer/Weather/Weather';
import Corona from '../PortfolioContainer/Corona/Corona';

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
      screen_name: 'Weather',
      component: Weather,
   },
   {
      screen_name: 'Corona',
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
