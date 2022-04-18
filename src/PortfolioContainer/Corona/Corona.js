import React from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Corona.css';

export default function Corona(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   return (
      <div className="corona-container screen-container" id={props.id || ''}>
         <div className="corona-parent">
            <ScreenHeading
               title={'Corona'}
               // subHeading={'This is Corona'}
            />
         </div>

         {/* Sample div */}
         {/* <div className="corona-text">Corona</div> */}
      </div>
   );
}
