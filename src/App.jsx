import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import 'boxicons'

export const WeatherIcons = {
  "01d": '/icon/sunny.svg',
  "01n": '/icon/night.svg',
  "02d": '/icon/day.svg',
  "02n": '/icon/cloudy-night.svg',
  "03d": '/icon/cloudy.svg',
  "03n": '/icon/cloudy.svg',
  "04d": '/icon/perfect-day.svg',
  "04n": '/icon/cloudy-night.svg',
  "09d": '/icon/rain.svg',
  "09n": '/icon/rain-night.svg',
  "10d": '/icon/rain.svg',
  "10n": '/icon/rain-night.svg',
  "11d": '/icon/storm.svg',
  "11n": '/icon/storm.svg',
  "13d": '/icon/snow-day.svg',
  "13n": '/icon/snow-night.svg',
  "50d": '/icon/mist-day.svg',
  "50n": '/icon/mist-night.svg'
}


// export const WeatherBackgrounds = {
//   "01d": './src/assets/icons/sunny.svg',
//   "01n": './src/assets/icons/night.svg',
//   "02d": './src/assets/icons/day.svg',
//   "02n": './src/assets/icons/cloudy-night.svg',
//   "03d": './src/assets/icons/cloudy.svg',
//   "03n": './src/assets/icons/cloudy.svg',
//   "04d": './src/assets/icons/perfect-day.svg',
//   "04n": './src/assets/icons/cloudy-night.svg',
//   "09d": './src/assets/icons/rain.svg',
//   "09n": './src/assets/icons/rain-night.svg',
//   "10d": './src/assets/icons/rain.svg',
//   "10n": './src/assets/icons/rain-night.svg',
//   "11d": './src/assets/icons/storm.svg',
//   "11n": './src/assets/icons/storm.svg',
//   "13d": './src/assets/icons/snow-day.svg',
//   "13n": './src/assets/icons/snow-night.svg',
//   "50d": './src/assets/icons/mist-day.svg',
//   "50n": './src/assets/icons/mist-night.svg',
// }


function App() {

  const [query, setQuery] = useState('');
  const [latLon, setLatLon] = useState({});
  const [weather, setWeather] = useState();
  const [isBoolean, setIsBolean] = useState(true)
  const toggleIsBoolean = () => setIsBolean(!isBoolean)

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setLatLon({ lat, lon })
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])


  useEffect(() => {
    if (latLon.lat !== undefined) {

      const API_KEY = 'f878e607aeaa1e3e4711fe93f36c7bc4'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&units=${isBoolean ? 'metric' : 'imperial'}&appid=${API_KEY}`

      axios.get(URL)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))

    }
  }, [latLon, isBoolean])

  const URL1 = 'https://api.openweathermap.org/data/2.5/'
  const API_KEY = 'f878e607aeaa1e3e4711fe93f36c7bc4'
  const search = evt => {
    if (evt.key === 'Enter') {
      axios.get(`${URL1}weather?q=${query}&units=${isBoolean ? 'metric' : 'imperial'}&APPID=${API_KEY}`)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
    }
  }

  console.log(weather?.timezone);


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  // let timeZoneCode = {weather?.timezone}

  return (

    <div className={
      (typeof weather?.main != 'undefined') ? ((weather?.weather[0].main == ('Clouds' || 'Rain' || 'Snow')) ? 'App clouds' : 'App')
         : 'App'
      }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="weatherinfo">
          <div className="weather-box">
            <div className="temp">{`${Math.round(weather?.main.temp)} ${isBoolean ? '°C' : '°F'}`}</div>
            <div className="weather"> | {weather?.weather[0].description}</div>
            <div className="weatherLogo">
              <img src={WeatherIcons[weather?.weather[0].icon]} alt="" />
            </div>
          </div>
          <div className="location-box">
            <div className="location">{weather?.name}, {weather?.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="time-box">
            <div className="time">
              {

              }
            </div>
          </div>
          <div className="weather-detail-info">
            <div className="humidity-container">
              <span className="humidy detailed-info"><box-icon name='droplet' type='solid' color='#ffffff'></box-icon></span>
              <div className='humidity-value-description'>
                <span className="humidity-value">{weather?.main.humidity} %</span>
                <span className="humidity-description">Humidity</span>
              </div>
            </div>
            <div className="windSpeed-container">
              <span className="wind detailed-info"><box-icon name='wind' color='#ffffff' ></box-icon></span>
              <div className='windSpeed-value-description'>
                <span className="windSpeed-value">{`${weather?.wind.speed} ${isBoolean ? 'm/s' : 'mi/h'}`}</span>
                <span className="windSpeed-description">Wind Speed</span>
              </div>
            </div>
            <div className="clouds-container">
              <span className="clouds detailed-info"><box-icon name='cloud' type='solid' color='#ffffff'></box-icon></span>
              <div className='clouds-value-description'>
                <span className="clouds-value">{weather?.clouds.all} %</span>
                <span className="clouds-description">Clouds</span>
              </div>
            </div>
            <div className="sensation-container">
              <span className="sensation detailed-info"><box-icon name='thermometer' type='solid' color='#ffffff' ></box-icon></span>
              <div className='sensation-value-description'>
              <span className="sensation-value">{`${weather?.main.feels_like} ${isBoolean ? '°C' : '°F'}`}</span>
              <span className="sensation-description">Feels like</span>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button className='button' onClick={toggleIsBoolean}><span>{isBoolean ? 'Imperial System' : 'Metric System'}</span></button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App;
