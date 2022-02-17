import React from "react";
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div class="search">
      <input 
      type="text" 
      id="searchbar"
      placeholder="Enter Location"
    />
    <input 
      type="date"
      id="start"
      name="startingdate"
      min="2022-02-17"
      max="2023-12-31"
    />
    <input 
      type="date"
      id="end"
      name="endingdate"
      min="2022-02-17"
      max="2023-12-31"
    />
    <button id="enter" type="Submit"> Enter </button>
    </div>
    
  )
}

export default SearchBar;