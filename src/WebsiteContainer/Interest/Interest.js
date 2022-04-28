import React from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Interest.css';

export default function Interest(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   return (
      <div className="interest-container screen-container" id={props.id || ''}>
         <div className="interest-parent">
            <ScreenHeading
               title={'Interest'}
               // subHeading={'This is the Weather'}
            />
         </div>
      </div>
   );
}
