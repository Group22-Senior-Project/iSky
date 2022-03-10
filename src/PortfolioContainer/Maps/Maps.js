import React, { useEffect } from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Maps.css';
//import Map from 'react-map-gl';

export default function Maps(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   // Map Token
   const MAPBOX_TOKEN =
      'pk.eyJ1IjoicmljaGFyZHRyYW4yOTgiLCJhIjoiY2wwMXV3djh5MG9lbzNkbnBkOXZwNmwxcSJ9.aWoUK1oWOPOwEYRyBO4U7Q';

   return (
      <div className="map-container screen-container" id={props.id || ''}>
         <div className="map-parent">
            <ScreenHeading title={'Map'} subHeading={'This is the Map'} />
         </div>

         {/* Sample div */}
         <div className="map-text">Map</div>
      </div>
   );
}

/* npm i react-map-gl */
