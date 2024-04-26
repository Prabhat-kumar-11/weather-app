import React from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { BsEye, BsWater, BsThermometer, BsWind } from "react-icons/bs";

export const WeatherCard = ({ icon, data, date, loading }) => {
  return (
    <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ImSpinner8 className="text-5xl text-white animate-spin" />
        </div>
      ) : (
        <div>
          <div className=" flex items-center gap-x-5">
            <div className="text-[87px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name},{data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-20 ">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <div className="text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2 ">
                <div className="text-[20px] ">
                  <BsEye />
                </div>
                <div>
                  {" "}
                  Visibility
                  <span className="ml-2">{data.visibility / 1000}km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2 ">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex ml-2">
                  Feels like
                  <div className="ml-2">{parseInt(data.main.feels_like)}</div>
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-x-2 ">
                <div className="text-[20px] ">
                  <BsWater />
                </div>
                <div>
                  Humidity
                  <span className="ml-2">{data.main.humidity}%</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2 ">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div className="flex ml-2">
                  Wind
                  <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
