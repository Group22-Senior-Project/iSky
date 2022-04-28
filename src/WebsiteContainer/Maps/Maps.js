import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import Animations from '../../utilities/Animations';
import './Maps.css';
import { React } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export default function Maps(props) {
   // Scrolling Animation
   // let fadeInScreenHandler = (screen) => {
   //    if (screen.fadeInScreen !== props.id) return;
   //    Animations.animations.fadeInScreen(props.id);
   // };

   // const fadeInSubscription =
      // ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   const coord = {
      lat: props.lat,
      lng: props.lon
   };
   // console.log({ coord });
   
   const containerStyle = {
      width: '100%',
      height: '600px'
   
   };

   const { isLoaded } = useJsApiLoader({
     id: 'google-map-script',
     googleMapsApiKey: "AIzaSyANPuESfFYjQXGTxPE7gEPvhddHvuh6IEI"
   })

   return isLoaded ? (
      <div className="map-container screen-container" id={props.id || ''}>
         <div className="map-parent">

            <ScreenHeading 
               title={'Map'} 
               // subHeading={'This is the Map'} 
            />
            <GoogleMap
               id="circle-example"
               mapContainerStyle={containerStyle}
               zoom={14}
               center={coord}
               onChange={() => {
                  console.log("hello");
               }}
               // onBoundsChanged={(e) => {
               //    console.log(getExtendedBounds());
            />
            { /* Child components, such as markers, info windows, etc. */ }
            </div>
      </div>
   )  : <></>
}

// npm i @react-google-maps/api

// export default React.memo(Map)