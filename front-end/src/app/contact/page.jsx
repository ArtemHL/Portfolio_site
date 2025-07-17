'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import { useState } from 'react'
import '../main.css'
import Link from 'next/link';

export default function WindowConfigurator() {

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
      const res = await fetch('http://localhost:8000/api/contact', {
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
    <Header/>
    <div className='page-backgroundcontact'>
    <section id="contact">
        <div className='main-content'>
        <h1>WE'D LOVE TO HEAR FROM YOU!</h1>
          <div className='contact-content'>
            <form className="form" onSubmit={handleSubmit}>   
              <div className='mobile-only'>
              <h3>WE'D LOVE TO HEAR FROM YOU!</h3>
            </div>
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

                <button className="fancyform" type="submit">
                  <span className="top-key"></span>
                  <span className="text">submit</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </button>
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
      </div>
    <Footer/>
    </>
  )
} 