// import React, { useEffect } from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Maps.css';
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// //import Map from 'react-map-gl';

export default function Maps(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   const fadeInSubscription =
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
 
 const center = {
   lat: 37.4323, 
   lng: -121.8996
 };
 

   const { isLoaded } = useJsApiLoader({
     id: 'google-map-script',
     googleMapsApiKey: "AIzaSyANPuESfFYjQXGTxPE7gEPvhddHvuh6IEI"
   })
 
   const [map, setMap] = React.useState(null)
 
   const onLoad = React.useCallback(function callback(maps) {
     const bounds = new window.google.maps.LatLngBounds();
     maps.fitBounds(bounds);
     setMap(maps)
   }, [])
 
   const onUnmount = React.useCallback(function callback(map) {
     setMap(null)
   }, [])
       
   
 

   return isLoaded ? (
      <div className="map-container screen-container" id={props.id || ''}>
         <div className="map-parent">
            <ScreenHeading title={'Map'} subHeading={'This is the Map'} />
            <GoogleMap
               mapContainerStyle={containerStyle}
               center={center}
               zoom={9}
               onLoad={onLoad}
               onUnmount={onUnmount}
            >
               { /* Child components, such as markers, info windows, etc. */ }
               <></>
            </GoogleMap>
               </div>

               {/* Sample div */}
               {/* <div className="map-text">Map</div> */}
      </div>
   )  : <></>
}

// /* npm i react-map-gl */

// export default React.memo(Map)