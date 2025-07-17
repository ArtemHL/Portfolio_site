'use client'
import './calculator.css'
import { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useEffect } from 'react'

export default function WindowConfigurator() {
  const [width, setWidth] = useState(1)
  const [height, setHeight] = useState(1)
  const [bars, setBars] = useState(1)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if(width <= 0 || height <= 0 || bars < 0) {
      setPrice(0);
      return;
    }
    const area = (width * height); 
    setPrice(area * 920 + bars * 30);
  }, [width, height, bars])

  return (
    <>
    <Header/>
    <div className="config-wrapper">
      <div className="config-left">
        <div className="config-price-box">
          <h2>Window Price Calculator</h2>
          <div className="price-display">
            <div className="price-label">Estimated Price:</div>
            <div className="new-price">{price.toFixed(2)} £</div>
          </div>
          <div className="price-disclaimer">
            * This is an approximate price and does not include any optional services or additional features.
            For a detailed quote, please contact our sales team.
          </div>
        </div>

        <div className="footer-info">
          <span>📞 Contact us for a detailed quote</span>
          <span>📞 07301 002233</span>
          <span>📞 07498 927693</span>
        </div>
      </div>

      <div className="config-right">
        <div className="input-group">
          <label>Window Dimensions (m)</label>
          <div className="flex-row">
            <div className="input-wrapper">
              <input
                type="number"
                className="input-field"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
                min="0"
              />
              <span className="input-label">Width</span>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                className="input-field"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height"
                min="0"
              />
              <span className="input-label">Height</span>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label>Number of Bars</label>
          <div className="input-wrapper">
            <input
              type="number"
              className="input-field"
              min="0"
              value={bars}
              onChange={(e) => setBars(e.target.value)}
              placeholder="Enter number of bars"
            />
            <span className="input-label">Bars</span>
          </div>
        </div>

        <div className="reminder">
          <h3>Feel free to email us for any details or questions</h3>
          <p>sashstudio.web@gmail.com</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
} 