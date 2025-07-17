'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryItem from '../components/GalleryItem'
import StandartBtn from '../components/StandartButton'
import './gallery.css';


export default function SashWindows() {
  const items = [
  { src: '/windows1.jpg', alt: 'Window 1', label: 'Classic Sash - White' },
  { src: '/windows2.jpg', alt: 'Window 2', label: 'Classic side-hung with bars' },
  { src: '/windows3.jpg', alt: 'Window 3', label: 'Arched Top - Oak Finish' },
  { src: '/windows4.jpg', alt: 'Window 4', label: 'Modern Grey with Transoms' },
  { src: '/windows5.jpg', alt: 'Window 5', label: 'Classic Sash - whole lotta bars' },
  { src: '/windows6.jpg', alt: 'Window 6', label: 'Modern white convex shaped' },
  { src: 'sash-w1.jpg', alt: 'Sash Window 1', label: 'Traditional Sash - White' },
  { src: 'sash-w2.jpg', alt: 'Sash Window 2', label: 'Traditional Sash - White' },
  { src: 'sash-w3.jpg', alt: 'Sash Window 3', label: 'Traditional Sash - White' },
  { src: 'sash-w4.jpg', alt: 'Sash Window 4', label: 'Traditional Sash - White' },
  { src: 'door1.jpg', alt: 'Door 1', label: 'Classic Front Door' },
  { src: 'door2.jpg', alt: 'Door 2', label: 'Classic Front Door - Black' },
  { src: 'door3.jpg', alt: 'Door 3', label: 'Classic Front Door - Black' },
  { src: 'door4.jpg', alt: 'Door 4', label: 'Classic Front Door - Black' },
  { src: 'door5.jpg', alt: 'Door 5', label: 'Classic Front Door' },
  { src: 'door6.jpg', alt: 'Door 6', label: 'Classic Front Door' },
  { src: 'stair1.jpg', alt: 'Staircase 1', label: 'Elegant Staircase' },
  { src: 'stair2.jpg', alt: 'Staircase 2', label: 'Elegant Staircase ' },
  { src: 'stair3.jpg', alt: 'Staircase 3', label: 'Elegant Staircase' },
  { src: 'stair4.jpg', alt: 'Staircase 4', label: 'Elegant Staircase - Oak' },
  { src: 'stair5.jpg', alt: 'Staircase 5', label: 'Elegant Staircase ' },
  { src: 'casment-w1.jpg', alt: 'Casement Window 1', label: 'Modern Casement' },
  { src: 'casment-w2.jpg', alt: 'Casement Window 2', label: 'Modern Casement ' },
  { src: 'casement-w2.jpg', alt: 'Casement Window 3', label: 'Modern Casement ' },
];

  return (
    <>
    <Header/>
    <div className='page-background'>
        <div className = 'page-content'>
            <h2 className = "page-header">Our Works</h2>
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