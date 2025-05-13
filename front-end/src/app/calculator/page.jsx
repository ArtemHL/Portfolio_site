'use client'
import './calculator.css'
import { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useEffect } from 'react'

const colors = [
  { code: 'RAL 9016', label: 'White' },
  { code: 'RAL 9010', label: 'Pure White' },
  { code: 'RAL 9001', label: 'Cream' },
  { code: 'RAL 1013', label: 'Oyster' },
  { code: 'RAL 7016', label: 'Anthracite Grey' },
  { code: 'RAL 5022', label: 'Royal Blue' },
  { code: 'RAL 7032', label: 'Pebble Grey' },
  { code: 'RAL 7033', label: 'Cement Grey' },
]

const materials = [
  { code: 'wood', label: 'Wood' },
  { code: 'aluminum', label: 'Aluminum' },
  { code: 'upvc', label: 'uPVC' },
]

export default function WindowConfigurator() {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)
  const [hardware, setHardware] = useState('weight')
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0])
  const [transoms, setTransoms] = useState(0)

  const [Price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(width*height * 920 / 100000 + transoms * 30);
  }, [width, height, hardware, selectedColor, selectedMaterial, transoms])

  return (
    <>
    <Header/>
    <div className="config-wrapper">
      <div className="config-left">
        <div className="config-preview-box">
          <h2>Your Configuration</h2>
          <div className="config-preview">Window Preview</div>
          <p className="config-caption">View FROM inside</p>
        </div>

        <div className="config-price-box">
          <div>
            <div className="new-price">{Price} $</div>
          </div>
          <button className="add-button">Add to basket</button>
        </div>

        <div className="footer-info">
          <span>📦 Delivery from 4 weeks</span>
          <span>📞 07951 049784</span>
        </div>
      </div>

      <div className="config-right">
        <div className="input-group">
          <label>Dimensions (mm)</label>
          <div className="flex-row">
            <input
              type="number"
              className="input-field"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Width A"
            />
            <input
              type="number"
              className="input-field"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height A"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Sash Hardware</label>
          <div className="flex-row">
            <button
              onClick={() => setHardware('weight')}
              className={hardware === 'weight' ? 'button-active' : 'button-passive'}
            >
              Weight Balances
            </button>
            <button
              onClick={() => setHardware('spring')}
              className={hardware === 'spring' ? 'button-active' : 'button-passive'}
            >
              Spring Balances
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Exterior Colour of Wood</label>
          <div className="color-grid">
            {colors.map((color) => (
              <button
                key={color.code}
                onClick={() => setSelectedColor(color)}
                className={
                  'color-card' + (selectedColor.code === color.code ? ' selected' : '')
                }
              >
                <div className="color-swatch"></div>
                <div>{color.code}</div>
                <div className="color-label">{color.label}</div>
              </button>
            ))}
          </div>
          <div className="input-group">
            <label>Material</label>
            <div className="color-grid">
              {materials.map((material) => (
                <button
                  key={material.code}
                  onClick={() => setSelectedMaterial(material)}
                  className={
                    'color-card' + (selectedMaterial.code === material.code ? ' selected' : '')
                  }
                >
                  <div className="color-swatch" />
                  <div className="color-label">{material.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="input-group">
            <label>Number of Transoms</label>
            <input
              type="number"
              className="input-field"
              min={0}
              value={transoms}
              onChange={(e) => setTransoms(e.target.value)}
              placeholder="e.g. 2"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
} 