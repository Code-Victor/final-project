import { weather } from "@/api";
import React from "react";

const Weather = () => {
  const { data } = weather.getWeather.useQuery();
  const weatherData = data?.weather?.[0];
  var iconurl = "http://openweathermap.org/img/w/" + weatherData?.icon + ".png";
  return (
    <div className="bg-gray-300 text-gray-900 px-6 py-2 rounded-md fixed bottom-5 left-5">
      <div className="flex gap-2">
        <img src={iconurl} alt="weather icon" />
        <h2 className="font-bold text-lg">{weatherData.description}</h2>
      </div>
      <h3 className="font-bold">{data?.name}</h3>
    </div>
  );
};

export default Weather;
