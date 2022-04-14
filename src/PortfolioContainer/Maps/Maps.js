import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Maps.css';
import { React, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { useState } from 'react/cjs/react.production.min';

export default function Maps(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   // const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   
   // const [coord, setCoord] = useState(props.coord);
   // console.log(props);
   const coord = {
      lat: props.lat,
      lng: props.lon
   };
   // console.log(coord);
   
   

   const containerStyle = {
      width: '100%',
      height: '600px'
   
   };
 
   // const location = {
   //    lat: 37.3382, 
   //    lng: -121.8863
   // //  lat: 33.610600, 
   // //  lng: -112.149640
   // };
 

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
               zoom={14}
               center={coord}
            />
               { /* Child components, such as markers, info windows, etc. */ }
            
            

               </div>
      </div>
   )  : <></>
}

// npm i @react-google-maps/api

// export default React.memo(Map)