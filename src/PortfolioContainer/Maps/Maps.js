// import React, { useEffect } from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Maps.css';
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export default function Maps(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   // const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

//    // Map Token
//    const MAPBOX_TOKEN =
//       'pk.eyJ1IjoicmljaGFyZHRyYW4yOTgiLCJhIjoiY2wwMXV3djh5MG9lbzNkbnBkOXZwNmwxcSJ9.aWoUK1oWOPOwEYRyBO4U7Q';

const containerStyle = {
   // position: 'relative',
   // top: '100px',
   // alignitems: 'center',
   width: '100%',
   height: '600px'
 
 };
 
 const location = {
   lat: 37.4323, 
   lng: -121.8997
 };
 

   const { isLoaded } = useJsApiLoader({
     id: 'google-map-script',
     googleMapsApiKey: "AIzaSyANPuESfFYjQXGTxPE7gEPvhddHvuh6IEI"
   })

 
   return isLoaded ? (
      <div className="map-container screen-container" id={props.id || ''}>
         <div className="map-parent">

            <ScreenHeading title={'Map'} subHeading={'This is the Map'} />
            <GoogleMap
               id="circle-example"
               mapContainerStyle={containerStyle}
               zoom={9}
               center={location}
            />
               { /* Child components, such as markers, info windows, etc. */ }
            
            

               </div>

               {/* <div className="map-text">Map</div> */}
      </div>
   )  : <></>
}

// npm i @react-google-maps/api

// export default React.memo(Map)