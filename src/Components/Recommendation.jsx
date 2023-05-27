import React from "react";

const CityItem = ({ city, setInput, fetchWeatherData}) => {
    return (
        <div className="p-1 cursor-pointer">
            <div className="hover:bg-slate-100" onClick={() => { setInput(city);  fetchWeatherData();}}>
                {city}
            </div>
            <hr />
        </div>
    )
}

const Recommendation = ({ cities, setinputvalue, fetchWeatherData }) => {
    // console.log(setInput);
    console.log(cities);
    return (
        <>
            {cities.map((city, idx) => <CityItem key={idx} city={city} setInput={setinputvalue} fetchWeatherData = {fetchWeatherData} />)}
        </>
    )
};

export default Recommendation;