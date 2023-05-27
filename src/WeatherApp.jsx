// import React from "react";
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import WelcomeImg from './images/welcome.png';
import NotfoundImg from './images/noresult.png';
import './index.css';
import HeaderSection from './Components/Header';
import ProxyMainSection from './Components/ProxyMainSection';
import WeatherInfoSection from './Components/WeatherInfoSection';
import Recommendation from './Components/Recommendation';
import Cities from './Components/CitiesDB';


const MainSection = () => {
    const appid = 'OPENWEATHERAPP-KEY';
    const [weatherData, setWeathereData] = useState(-1);
    const [inputvalue, setinputvalue] = useState('');
    const [tarCities, setTarCities] = useState([]);

    const fetchWeatherData = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${appid}`;
        // console.log(url);
        fetch(url).then((res) => {
            return res.json();
        }).then((res) => {
            // console.log('result: ', res);
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
                setTarCities([]);
                // console.log('weatherData: ', newWeathData);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(()=>{
        console.log(inputvalue," : ");
        let result = [];
        for(let city of Cities)
        {
            if(inputvalue.length === 0 || result.length === 10)
            {
                break;
            }
            if(city.toLowerCase().includes(inputvalue.toLowerCase()))
            {
                result.push(city);
            }
        }
        setTarCities(result);
    }, [inputvalue]);

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
                    <div className='w-full absolute z-10 bg-white font-serif'>
                        <Recommendation cities={tarCities} setinputvalue = {setinputvalue} fetchWeatherData = {fetchWeatherData}/>
                    </div>  
                </div>
                {/* Result Showcase section */}
                <div className='w-full shadow-xl bg-slate-100 font-serif'>
                    {(isNaN(weatherData)) ? <WeatherInfoSection wdata={weatherData} /> : (weatherData === -1 ? <ProxyMainSection imgstr={WelcomeImg} msg='Welcome to Weather App' /> : <ProxyMainSection imgstr={NotfoundImg} msg='Invalid Cityname or Pincode' />)}
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