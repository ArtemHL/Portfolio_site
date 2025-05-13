'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import GalleryItem from './components/GalleryItem';
import "./main.css";

const items = [
  { src: '/windows1.jpg', alt: 'Window 1', label: 'Classic Sash - White' },
  { src: '/windows2.jpg', alt: 'Window 2', label: 'Modern Grey with Transoms' },
  { src: '/windows3.jpg', alt: 'Window 3', label: 'Arched Top - Oak Finish' },
  { src: '/windows4.jpg', alt: 'Window 4', label: 'Modern Grey with Transoms' },
  { src: '/windows5.jpg', alt: 'Window 5', label: 'Modern Grey with Transoms' }
]

export default function Home() {
  const router = useRouter();

  const [locationValue, setLocationValue] = useState("");
  const [ShowDropDown, setShowDropDown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Edinburgh', 'Cardiff']);
  const Locations = ['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Edinburgh', 'Cardiff'];

  const handleChangeInput = (value) => {
    setLocationValue(value);
    setShowDropDown(true);

    const filtered = Locations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {
    setLocationValue(option);
    setShowDropDown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropDown(false), 15);
  };

  return (
    <>
      <Header />
      <img className='fullwvImg' src="https://www.whyteandwood.com/wp-content/uploads/2018/11/Explore_Timber_Sash_Windows_-_Header.jpg" alt="" />
      <div className='main-content'>
        <div className='text-content'>
          <h1>Lorem, ipsum dolor.</h1>
          <p style={{fontSize: 18, marginTop: 40 }} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic consequuntur ipsum exercitationem incidunt ab dignissimos, maiores commodi molestiae provident labore accusantium quisquam quasi explicabo debitis voluptates praesentium amet fugit nam quos voluptatem sit. Cum quod quo, repudiandae rem, ratione officia, nostrum temporibus atque aperiam corporis minima sequi consectetur nobis cupiditate minus mollitia nam. Doloremque iste, distinctio consequatur facere cum maiores.</p>
          <a className="fancy" href="#contact">
            <span className="top-key"></span>
            <span className="text">Contact Us</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>
      </div>
      <hr />
      <div className='main-content'>
        <h1>Our Works</h1>
        <div className="gallery-grid">
          {items.map((item, i) => (
            <GalleryItem key={i} {...item} />
          ))}
        </div>
      </div>
      <hr />
      <section id="contact">
        <div className='main-content'>
        <h1>WE’D LOVE TO HEAR FROM YOU!</h1>
          <div className='contact-content'>
            <form className="form">   
                <div className="flexform">
                    <label className='flexInput'>
                        <input required placeholder="" type="text" className="input" />
                        <span>first name</span>
                    </label>

                    <label className='flexInput'>
                        <input required placeholder="" type="text" className="input flexInput"/>
                        <span>last name</span>
                    </label>
                </div>  
                        
                <label>
                    <input required placeholder="" type="email" className="input"/>
                    <span>email</span>
                </label> 
                    
                <label>
                    <input required type="tel" placeholder="" className="input"/>
                    <span>contact number</span>
                </label>
                <label style={{ position: 'relative' }}>
      <input
        required
        type="text"
        name="location"
        value={locationValue}
        onChange={(e) => handleChangeInput(e.target.value)}
        onFocus={() => setShowDropDown(true)}
        onBlur={handleBlur}
        className="input"
        autoComplete="off"
      />
         <span>Location</span>
      {ShowDropDown && filteredOptions.length > 0 && (
        <div
          className="dropdown-content"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            border: '1px solid #ccc',
            background: 'white',
            zIndex: 1000,
          }}
        >
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              className="dropdown-option"
              onMouseDown={() => handleSelectOption(option)} // use onMouseDown to beat blur
              
            >
              {option}
            </button>
          ))}
        </div>
      )}
                </label>
                <label>
                    <textarea required="" rows="6" placeholder="" className="input01"></textarea>
                    <span>message</span>
                </label>
                <button className="fancyform" href="#">
                  <span className="top-key"></span>
                  <span className="text">submit</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </button>
            </form>
            <div className='contact-info'>
              <h2>Adress</h2>
              <p>Castle Hill House,
                12 Castle Hill,
                Windsor,
                Berkshire,
                SL4 1PD</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
