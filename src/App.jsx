import React, { useEffect, useState } from "react";
import "./index.css";
import APIkey from "./apiKey";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Atlanta");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // console.log(data);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-7xl animate-spin" />
        </div>
      </div>
    );
  }

  let icon;
  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-400 to-green-400 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <form>form</form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div>
          <div className=" bg-gray-100/30 flex items-center gap-x-5">
            <div className="text-[87px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCMonth()}/{date.getUTCDate()}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <div className="text-4xl">
                <TbTemperatureFahrenheit />
              </div>
            </div>
          </div>
          <div>bottom</div>
        </div>
      </div>
    </div>
  );
}

export default App;
