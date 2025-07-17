'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import GalleryItem from './components/GalleryItem';
import "./main.css";
import Link from 'next/link';
import StandartBtn from './components/StandartButton';
import AnimatedWindow from './components/window';
import Head from 'next/head';
import './globals.css';
import './components/components.css';

const items = [
  { src: '/windows1.jpg', alt: 'Window 1', label: 'Classic Sash - White' },
  { src: '/windows2.jpg', alt: 'Window 2', label: 'Classic side-hung with bars' },
  { src: '/windows3.jpg', alt: 'Window 3', label: 'Arched Top - Oak Finish' },
  { src: '/windows4.jpg', alt: 'Window 4', label: 'Modern Grey with Transoms' },
  { src: '/windows5.jpg', alt: 'Window 5', label: 'Classic Sash - whole lotta bars' },
  { src: '/windows6.jpg', alt: 'Window 6', label: 'Modern white convex shaped' },
  { src: 'door2.jpg', alt: 'Door 1', label: 'Classic Front Door' },
  { src: 'stair1.jpg', alt: 'Staircase 1', label: 'Elegant Staircase'},
];

export default function Home() {
  const router = useRouter();

  const [locationValue, setLocationValue] = useState("");
  const [ShowDropDown, setShowDropDown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Edinburgh', 'Cardiff']);
  const Locations = ['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Edinburgh', 'Cardiff'];

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeInput = (value) => {
    setLocationValue(value);
    setFormState(prev => ({ ...prev, location: value }));
    setShowDropDown(true);

    const filtered = Locations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {
    setLocationValue(option);
    setFormState(prev => ({ ...prev, location: option }));
    setShowDropDown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropDown(false), 15);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: `${formState.firstName} ${formState.lastName}`,
      email: formState.email,
      message: `Phone: ${formState.phone}\nLocation: ${formState.location}\n\n${formState.message}`
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('Message sent successfully!');
        // Reset form
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          message: ''
        });
        setLocationValue('');
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <>
     <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
     </Head>
      <Header />
      <div className='hero-section'>
        <img src="/logo4.png" className = "logo1" alt="background"/>
      
        <h1 className='hero-title'>Sash Studio</h1>
        <p className='hero-subtitle'>Crafting Excellence in Window Design</p>
      </div>
      <div className='main-content'>
        <div className='text-content'>
          <h1>High-End Joinery at Honest Prices – Crafted with Precision Across the UK</h1>
          <p style={{fontSize: 18, marginTop: 40 }}>We are a young joinery company built by seasoned craftsmen with decades of hands-on experience. Established in 2024, our team came together with one goal: to offer premium-quality wooden products at prices below market level — without cutting corners on materials or craftsmanship.

At our workshop, we create bespoke wooden windows, doors, and interior pieces tailored to fit any style and space. From classic sash windows to custom-built joinery for renovations or new builds, we're ready to take on projects of any complexity across the UK.

We combine traditional craftsmanship with modern equipment to deliver exceptional detail, durability, and a flawless finish. Whether you're an architect, homeowner, or builder — we speak your language and work with you every step of the way.

If you're looking for master-level joinery done with care, precision, and integrity — let's talk.</p>
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
        <div className="gallery-gridMain">
          {items.map((item, i) => (
            <GalleryItem key={i} {...item} />
          ))}
        </div>
      </div>
      <hr />
      <section id="contact">
        <div className='main-content'>
        <h1>WE'D LOVE TO HEAR FROM YOU!</h1>
          <div className='contact-content'>
            <form className="form" onSubmit={handleSubmit}>   
                <div className="flexform">
                    <label className='flexInput'>
                        <input required name="firstName" value={formState.firstName} onChange={handleChange} placeholder="" type="text" className="input" />
                        <span>first name</span>
                    </label>

                    <label className='flexInput'>
                        <input required name="lastName" value={formState.lastName} onChange={handleChange} placeholder="" type="text" className="input flexInput"/>
                        <span>last name</span>
                    </label>
                </div>  
                
                <label>
                    <input required name="email" value={formState.email} onChange={handleChange} placeholder="" type="email" className="input"/>
                    <span>email</span>
                </label> 

                <label>
                    <input required name="phone" value={formState.phone} onChange={handleChange} type="tel" placeholder="" className="input"/>
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
                          onMouseDown={() => handleSelectOption(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </label>

                <label>
                    <textarea required name="message" value={formState.message} onChange={handleChange} rows="6" placeholder="" className="input01"></textarea>
                    <span>message</span>
                </label>
                  <StandartBtn text = "Submit" type = "submit"/>
            </form>
            <div className='contact-info'>
              <h2>Address</h2>
              <p>Unit 9, Avenue Business Park, Justin Rd, London E4 8SU</p>
              <p>Your form will be processed by our team within 24 hours. Have a lovely day!</p>
              <p>You can also calculate the estimated cost of your project <a href="/calculator">here</a></p>
              <Link href="/calculator" className="calculator-button">
                <span className="button-text">Calculate Your Project</span>
                <span className="button-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}