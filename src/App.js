import './App.css';
import Weather from './components/Weather/Weather'
import SearchBar from './components/SearchBar/SearchBar'
import Map from './components/Map/Map'
import Covid from './components/Covid/Covid'

function App() {
   return (
      <div className="App">
         <SearchBar />
         <div class="wrapper">
            <Weather />
            <Map />
         </div>
         <Covid />
      </div>
   );
}

export default App;
