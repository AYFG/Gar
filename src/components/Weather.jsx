import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather() {
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const navigate = navigator.geolocation;
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    navigate.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const getWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`
      );
      const date = res.data.weather[0];
      const weatherType = date.description;
      const iconUrl = `https://openweathermap.org/img/wn/${date.icon}@2x.png`;
      setWeatherType(weatherType);
      setWeatherIcon(iconUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <img
        src={weatherIcon}
        alt="오늘의 날씨 아이콘"
        className="weather-icon"
      />
    </>
  );
}
