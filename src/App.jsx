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
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Atlanta");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);
  // console.log(data);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-blue-400 to-green-400 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-7xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;
  // console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#3178fb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#3178fb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
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
      {errorMsg && (
        <div className=" w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff2020] text-white absolute top-2 lg:top-10 p-110 capitalize rounded-md z-10">{`${errorMsg.response.data.message}`}</div>
      )}
      <form
        className={`${
          animate ? "animate-bounce" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className=" h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country "
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition">
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className=" w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            <div className=" bg-gray-100/30 rounded-full p-1 flex items-center gap-x-5">
              <div className="text-[87px]">{icon}</div>
              <div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCMonth()}/{date.getUTCDate()}/
                  {date.getUTCFullYear()}
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
              <div className=" capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            <div className=" max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className=" text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibilty{" "}
                    <span className="ml-2">
                      {parseInt((data.visibility / 1000) * 0.621371)} mi
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className=" text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}{" "}
                      <TbTemperatureFahrenheit />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className=" text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className=" text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind<span className="ml-2">{data.wind.speed} mph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
