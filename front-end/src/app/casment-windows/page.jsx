'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryItem from '../components/GalleryItem'
import StandartBtn from '../components/StandartButton'
import './casment.css';


export default function SashWindows() {
  const items = [
  { src: 'casement-w2.jpg', alt: 'Casement Window 1', label: 'Modern Casement' },
  { src: 'casment-w2.jpg', alt: 'Casement Window 2', label: 'Modern Casement' },
  { src: 'casment-w3.jpg', alt: 'Casement Window 3', label: 'Modern Casement' },
];

  return (
    <>
    <Header/>
    <div className='page-background'>
        <div className = 'page-content'>
            <h2 className = "page-header">Made in London: Handcrafted Timber Casement Windows</h2>
            <p className = "page-article">
             At Sash Studio, we specialise in the design, restoration, and installation of high-quality casement windows across London. Whether you're restoring a heritage home or enhancing a contemporary space, our expert craftsmen bring timeless style and lasting performance to every window we create.<br/><br/><br/>

Casement windows are a classic choice — elegant, versatile, and ideal for maximising light and ventilation. We honour traditional techniques while incorporating the latest in joinery precision and modern finishes. From side-hung and top-hung configurations to fully bespoke designs, we work with you to complement the character and proportions of your property.<br/><br/><br/>

We also prioritise functionality and efficiency. Our casement windows are built with durable hardwood or softwood, secure multi-point locking systems, and optional upgrades like double glazing and draught-proofing — all tailored to boost thermal performance, security, and ease of use.<br/><br/><br/>

From Edwardian cottages to modern townhouses, we've completed casement window projects in every corner of London. Each window is crafted or restored with care, ensuring a seamless fit, elegant finish, and years of reliable performance.<br/><br/><br/>

Take a look through our gallery below to see the detail and craftsmanship that define our work. We believe the best results are those you can see — and feel — every day.
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