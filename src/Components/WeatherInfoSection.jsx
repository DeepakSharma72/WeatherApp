import React from "react";
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VisibilityIcon from '@mui/icons-material/Visibility';

const WeatherInfoSection = ({ wdata }) => {
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

export default WeatherInfoSection;