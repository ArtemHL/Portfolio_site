'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryItem from '../components/GalleryItem'
import StandartBtn from '../components/StandartButton'
import './staircases.css';


export default function SashWindows() {
  const items = [
    { src: '/stair1.jpg', alt: 'Staircase 1', label: 'Elegant Staircase' },
    { src: '/stair2.jpg', alt: 'Staircase 2', label: 'Elegant Staircase' },
    { src: '/stair3.jpg', alt: 'Staircase 3', label: 'Elegant Staircase' },
    { src: '/stair4.jpg', alt: 'Staircase 4', label: 'Elegant Staircase - Oak' },
    { src: '/stair5.jpg', alt: 'Staircase 5', label: 'Elegant Staircase'},
    { src: '/stair6.jpg', alt: 'Staircase 6', label: 'Elegant Staircase'  },
];

  return (
    <>
    <Header/>
    <div className='page-background'>
        <div className = 'page-content'>
            <h2 className = "page-header">Bespoke Timber Staircases — Crafted for Style, Built to Last</h2>
            <p className = "page-article">
             At Sash Studio, we design and build bespoke timber staircases that bring elegance, character, and craftsmanship into the heart of your home. Whether you're renovating a period property or planning a modern interior, our staircases are tailored to fit both your space and your style.<br/><br/><br/>

A staircase is more than just a functional feature — it’s often the centrepiece of a home. That’s why we approach every project with precision, creativity, and care. From grand, sweeping flights to compact, space-saving solutions, our team crafts staircases that are as practical as they are visually striking.<br/><br/><br/>

We work with a wide range of high-quality hardwoods and softwoods, offering traditional and contemporary designs with options for custom balustrades, handrails, and finishes. Whether you prefer classic oak, sleek ash, or painted pine, every staircase is built to match your vision and enhance your home’s overall flow.<br/><br/><br/>

With a strong understanding of structural requirements and building regulations, we ensure every staircase is not only beautiful but also safe, stable, and built to last. From concept to installation, we collaborate closely with homeowners, designers, and architects to ensure a flawless result.<br/><br/><br/>

Browse our gallery to see examples of our staircase work across London — and discover how expert joinery can elevate every level of your home.


              </p>
          <div className="gallery-grid">
                    {items.map((item, i) => (
                      <GalleryItem key={i} {...item} />
                    ))}
          </div>
          <StandartBtn text = "Interested?" link = "contact" />
        </div>

        </div>
    <Footer/>
    </>
  )
} 