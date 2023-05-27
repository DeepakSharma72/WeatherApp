import React from "react";

const ProxyMainSection = ({ imgstr, msg }) => {
    return (
        <>
            <div className='p-5 font-bold text-center text-lg text-violet-700'>
                {msg}
            </div>
            <img className='w-10/12 md:w-8/12 lg:w-6/12 mx-auto mb-5' alt = 'proxy-pic' src={imgstr}></img>
            <br></br>
        </>
    )
};

export default ProxyMainSection;