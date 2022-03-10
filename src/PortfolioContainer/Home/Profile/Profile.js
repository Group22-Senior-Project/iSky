import React from 'react';
import Typical from 'react-typical';
import ScrollService from '../../../utilities/ScrollService';
import './Profile.css';

export default function Profile() {
   return (
      <div className="profile-container">
         <div className="profile-parent">
            <div className="profile-details">
               {/* Name Display */}
               <div className="profile-details-name">
                  <span className="primary-text">
                     {' '}
                     Hello, this is{' '}
                     <span className="highlighted-text">iSky!</span>
                  </span>
               </div>
               {/* Name Display */}

               {/* React Typical Animation */}
               <div className="profile-details-role">
                  <span className="primary-text">
                     {' '}
                     <h1>
                        {' '}
                        <Typical
                           loop={Infinity}
                           steps={[
                              'Planning a trip? 🌉',
                              1000,
                              'College Student.. 📚',
                              1000,
                              'Travel Information 🌎',
                              1000,
                              'Weather Forecasts ☀️',
                              1000,
                              'Looking for COVID Updates? 💘',
                              1000,
                              'iSky can Help! ✅',
                              1000,
                           ]}
                        />
                     </h1>
                     <span className="profile-role-tagline">
                        The vacation planner you always wanted!
                     </span>
                  </span>
               </div>
               {/* React Typical Animation */}

               {/* Buttons */}
               <div className="profile-options">
                  <button
                     className="btn primary-btn"
                     onClick={() =>
                        ScrollService.scrollHandler.scrollToWeather()
                     }
                  >
                     {' '}
                     Forecast{' '}
                  </button>
                  <button
                     className="btn highlighted-btn"
                     onClick={() =>
                        ScrollService.scrollHandler.scrollToCorona()
                     }
                  >
                     COVID
                  </button>
               </div>
               {/* Buttons */}
            </div>

            {/* Picture */}
            <div className="profile-picture">
               <div className="profile-picture-background"></div>
            </div>
            {/* Picture */}
         </div>
      </div>
   );
}
