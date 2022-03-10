import React from 'react';
import './ScreenHeading.css';

export default function ScreenHeading(props) {
   return (
      <div className="heading-container">
         {/* Reusable component for the Screen Title */}
         <div className="screen-heading">
            <span>{props.title}</span>
         </div>

         {/* Subheaders */}
         {props.subHeading ? (
            <div className="screen-sub-heading">
               <span>{props.subHeading}</span>
            </div>
         ) : (
            <div></div>
         )}

         {/* Highlight blob */}
         <div className="heading-seperator">
            <div className="seperator-line"></div>
            <div className="seperator-blob">
               <div></div>
            </div>
         </div>
      </div>
   );
}
