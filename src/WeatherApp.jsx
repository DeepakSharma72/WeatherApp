// import React from "react";
import { useState } from 'react';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WelcomeImg from './images/welcome.png';
import NotfoundImg from './images/noresult.png';
import './index.css';
const HeaderSection = () => {
    return (
        <>
            <div className="bg-slate-800 w-full text-white p-3 text-xl text-center font-extrabold">
                Weather App
            </div>
        </>
    )
}


const WeathInfo = ({ wdata }) => {
    return (
        <>
            <div className='text-center py-[30px] text-2xl'>
                {Math.round(wdata.temperature, 2)}℃ | {wdata.desc}
            </div>
            <div className='pb-[25px] text-center text-2xl font-bold'>
                {wdata.name}, {wdata.country}
            </div>
            <h4 className='font-bold ml-5'>Weather Info</h4>
            <div className='flex justify-evenly flex-wrap'>
                <div className='shadow bg-white w-10/12 md:w-5/12 m-3 p-5 rounded-md flex'>
                    <div className='w-4/12'>
                        <WbTwilightIcon fontSize='large' />
                    </div>
                    <div className='w-7/12 text-center text-xl'>
                        {wdata.sunset}
                        <hr />
                        sunset
                    </div>
                </div>
                <div className='shadow-2xl bg-white w-10/12 md:w-5/12 m-3 p-5 flex rounded-md'>
                    <div className='w-4/12'>
                        <WbSunnyIcon fontSize='large' />
                    </div>
                    <div className='w-7/12 text-center text-xl'>
                        {wdata.sunrise}
                        <hr />
                        Sunrise
                    </div>
                </div>
                <div className='shadow-2xl bg-white w-10/12 md:w-5/12 m-3 p-5 flex rounded-md'>
                    <div className='w-4/12'>
                        <InvertColorsIcon fontSize='large' />
                    </div>
                    <div className='w-7/12 text-center text-xl'>
                        {wdata.humidity}
                        <hr />
                        Humidity
                    </div>
                </div>
                <div className='shadow-2xl bg-white w-10/12 md:w-5/12 m-3 p-5 flex rounded-md'>
                    <div className='w-4/12'>
                        <AirIcon fontSize='large' />
                    </div>
                    <div className='w-7/12 text-center text-xl'>
                        {wdata.wind}
                        <hr />
                        Wind
                    </div>
                </div>
                <div className='shadow-2xl bg-white w-10/12 md:w-5/12 m-3 p-5 flex rounded-md'>
                    <div className='w-4/12'>
                        <CompareArrowsIcon fontSize='large' />
                    </div>
                    <div className='w-7/12 text-center text-xl'>
                        {wdata.pressure}
                        <hr />
                        Pressure
                    </div>
                </div>
                <div className='shadow-2xl bg-white w-10/12 md:w-5/12 m-3 p-5 flex rounded-md'>
                    <div className='w-4/12'>
                        <VisibilityIcon fontSize='large' />
                    </div>
                    <div className='w-7/12 text-center text-xl'>
                        {wdata.visibility}
                        <hr />
                        Visibility
                    </div>
                </div>
            </div>
        </>
    )
}

const HandleEdgeCase = ({ imgstr, msg }) => {
    return (
        <>
            <div className='p-5 font-bold text-center text-lg text-violet-700'>
                {msg}
            </div>
            <img className='w-10/12 md:w-8/12 lg:w-6/12 mx-auto mb-5' src={imgstr}></img>
            <br></br>
        </>
    )
};

const MainSection = () => {
    const appid = 'OPEN-WEATHER-APP-API';
    const [weatherData, setWeathereData] = useState(-1);
    const [inputvalue, setinputvalue] = useState('');
    const fetchWeatherData = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${appid}`;
        console.log(url);
        fetch(url).then((res) => {
            return res.json();
        }).then((res) => {
            console.log('result: ', res);
            if (res.cod === '404') {
                setWeathereData(0);
            }
            else {
                const getTime = (datestr) => {
                    const newdate = new Date(datestr * 1000);
                    const hrs = newdate.getHours();
                    const minute = newdate.getMinutes();
                    const second = newdate.getSeconds();
                    return `${hrs}:${minute}:${second}`;
                }
                const newWeathData = {
                    temperature: res.main.temp - 273.15,
                    pressure: res.main.pressure,
                    sunset: getTime(res.sys.sunset),
                    sunrise: getTime(res.sys.sunrise),
                    humidity: res.main.humidity,
                    wind: res.wind.speed,
                    name: res.name,
                    country: res.sys.country,
                    visibility: res.visibility,
                    desc: res.weather[0].main
                };
                setWeathereData(newWeathData);
                console.log('weatherData: ', newWeathData);
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div className='w-full sm:w-11/12 md:w-9/122 lg:w-8/12 xl:w-6/12 mx-auto my-5'>
                {/* input field section */}
                <div className='my-10 text-lg relative w-10/12 mx-auto'>
                    <input
                        type="text"
                        className="w-full border-b-[3px] p-1 font-semibold font-serif border-slate-400 focus:outline-none"
                        placeholder='Enter cityname or pincode'
                        value={inputvalue}
                        onChange={(e) => setinputvalue(e.target.value)}
                    />
                    <span className='absolute right-1 text-slate-500 cursor-pointer hover:text-black'
                        onClick={fetchWeatherData}>
                        <SearchIcon />
                    </span>
                </div>
                {/* Result Showcase section */}
                <div className='w-full shadow-xl bg-slate-100 font-serif'>
                    {(isNaN(weatherData)) ? <WeathInfo wdata={weatherData} /> : (weatherData == -1 ? <HandleEdgeCase imgstr={WelcomeImg} msg='Welcome to Weather App' /> : <HandleEdgeCase imgstr={NotfoundImg} msg='Invalid Cityname or Pincode' />)}
                </div>
            </div>
        </>
    )
}

const WeatherApp = () => {
    return (
        <>
            <HeaderSection />
            <MainSection />
        </>
    )
};

export default WeatherApp;