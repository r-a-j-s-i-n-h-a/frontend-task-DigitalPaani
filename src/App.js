import './App.css';
import Search from './component/search/search';
import CurrentWeather from './component/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import ForeCast from './component/forecast/forecast';
//for the animation icon
import Lottie from "react-lottie";
import weatherAnimation from "./lottie/weather.json";

var location=false;
function App() {



  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastFetch = fetch(`${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
   


    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setForeCast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));

      location=true;
      console.log(location);
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className='main-container' >
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast &&<ForeCast data={forecast} />}
      
      {!location && (
              <>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: weatherAnimation,
                  }}
                  height={200}
                  width={200}
                />
             
                  Search for location to see it's weather.
               
              </>
            )}
    </div>
  </div>
  );
}

export default App;
