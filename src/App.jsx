import "./App.css";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import { BsCloudHaze2Fill, BsCloudDrizzleFill } from "react-icons/bs";

import { ImSpinner8 } from "react-icons/im";
import { useEffect, useState } from "react";
import { WeatherCard } from "./components/WeatherCard";

const API_key = "d4094c06e0195d75ef238b152b266823";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("new york");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hanldeinput = (e) => {
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_key}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 500);
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

    return () => {
      clearTimeout(timer);
    };
  }, [errorMsg]);

  if (!data) {
    return (
      <div className=" w-full h-screen  bg-gradient-to-r from-teal-400 to-yellow-200 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div className="loading">
          <ImSpinner8 className="text-5xl text-white animate-spin" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
  }

  const date = new Date();

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-teal-400 to-yellow-200 flex flex-col justify-center items-center  px-4 lg:px-0">
        {errorMsg && (
          <div className=" w-full max-w-[90vw] lg:max-w-[450px] bg-[#6fe5f7]   absolute top-2  lg:top-10  p-4 capitalize rounded-md text-white">{`${errorMsg.response.data.message}`}</div>
        )}

        <form
          className={`${
            animate ? "animate-pulse" : "animate-none"
          } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mt-[70px] mb-8`}
        >
          <div className="h-full relative flex items-center justebetween p-2">
            <input
              onChange={(e) => hanldeinput(e)}
              className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full "
              type="text"
              placeholder="Search by city or country name"
            />{" "}
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
            >
              <IoMdSearch className="text-2xl text-[white]" />
            </button>
          </div>
        </form>
        <WeatherCard icon={icon} data={data} date={date} loading={loading} />
      </div>
    </>
  );
}

export default App;
