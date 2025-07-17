'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryItem from '../components/GalleryItem'
import StandartBtn from '../components/StandartButton'
import './sash.css';


export default function SashWindows() {
  const items = [
  { src: '/windows1.jpg', alt: 'Window 1', label: 'Classic Sash - White' },
  { src: '/windows2.jpg', alt: 'Window 2', label: 'Classic side-hung with bars' },
  { src: 'sash-w1.jpg', alt: 'Sash Window 1', label: 'Traditional Sash - White' },
  { src: 'sash-w2.jpg', alt: 'Sash Window 2', label: 'Traditional Sash - White' },
  { src: 'sash-w3.jpg', alt: 'Sash Window 3', label: 'Traditional Sash - White' },
  { src: 'sash-w4.jpg', alt: 'Sash Window 4', label: 'Traditional Sash - White' },
];

  return (
    <>
    <Header/>
    <div className='page-background'>
        <div className = 'page-content'>
            <h2 className = "page-header">Sash Windows – Timeless Style, Expert Craftsmanship</h2>
            <p className = "page-article">
              At Sash Studio, we specialise in the restoration, replacement, 
              and installation of traditional sash windows throughout London.
               Whether you’re looking to preserve the character of a period 
               property or add classic charm to a modern home, our team 
               delivers the highest standard of craftsmanship in every 
               project.<br/><br/><br/>

              Sash windows are a beautiful and functional feature that have 
              stood the test of time. We honour that tradition by using 
              quality timber, precise joinery, and careful attention to 
              detail. From single or double-hung designs to bespoke 
              solutions, we work closely with each client to match 
              the style and proportions of their home.<br/><br/><br/>

              We also understand that performance matters — that’s why we 
              combine traditional techniques with modern upgrades like 
              draught-proofing, smooth sliding mechanisms, and 
              energy-efficient glazing. The result is a window that not 
              only looks stunning but also improves comfort, insulation, 
              and security.<br/><br/><br/>

              We’ve completed sash window projects all over London, in Victorian terraces, Edwardian villas, and Georgian townhouses. Every window is handcrafted or restored with care, ensuring long-lasting results and a flawless finish.

              Browse our gallery below to see the quality of our work — we believe the results speak for themselves.
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