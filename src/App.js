import './App.css';
import Weather from './components/Weather/Weather'
import SearchBar from './components/SearchBar/SearchBar'
import Map from './components/Map/Map.js'

function App() {
   return (
      <div className="App">
         <SearchBar />
         <div class="wrapper">
            <Weather />
            <Map />
         </div>
      </div>
   );
}

export default App;
