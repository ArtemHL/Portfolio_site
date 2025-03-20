import React from 'react';
import GUI from '../components/GUI';
import Leftbox from '../components/Leftbox';
import ImageSlider from '../components/ImageSlider';
import "../css/Home.css";

const Home = () => {
    return (
        <div>
            <GUI/>
            <ImageSlider/>
        </div>
    );
};

export default Home;