import React, { useState, useEffect } from 'react';
import "../css/Home.css";


const images = [
  'https://rau.ua/wp-content/uploads/2020/07/rozetka-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0c8dLncVii-xNP5pmNwcaNWmeXz4zxEhCrw&s',
  'https://blog.keycrm.app/wp-content/uploads/2023/09/Shho-take-Cross-sell-ta-Up-sell-13-1024x576.jpg',
  // Add more image paths as needed
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="image-slider">
      <button className="prev" onClick={handlePrev}>
        &#10094;
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className='slide' />
      <button className="next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;