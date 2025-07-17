'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryItem from '../components/GalleryItem'
import StandartBtn from '../components/StandartButton'
import './doors.css';


export default function SashWindows() {
  const items = [
    { src: '/door1.jpg', alt: 'Door 1', label: 'Classic Front Door' },
    { src: '/door2.jpg', alt: 'Door 2', label: 'Classic Front Door - Black' },
    { src: '/door3.jpg', alt: 'Door 3', label: 'Classic Front Door - Black' },
    { src: '/door4.jpg', alt: 'Door 4', label: 'Classic Front Door - Black' },
    { src: '/door5.jpg', alt: 'Door 5', label: 'Classic Front Door' },
    { src: '/door6.jpg', alt: 'Door 6', label: 'Classic Front Door' },
];

  return (
    <>
    <Header/>
    <div className='page-background'>
        <div className = 'page-content'>
            <h2 className = "page-header">Quality Doors, Handcrafted in the Heart of London</h2>
            <p className = "page-article">
             At Sash Studio, we design, restore, and install beautifully crafted timber doors throughout London. Whether you’re upgrading a period property or finishing a modern renovation, we deliver doors that combine style, strength, and superb craftsmanship.<br/><br/><br/>

A door is more than just an entrance — it’s a first impression. We specialise in bespoke front doors, internal doors, French doors, and bi-folds, each made with care using high-quality hardwoods or softwoods. Every design is tailored to suit the architecture of your home and your personal taste, with options for traditional mouldings, glazed panels, and modern minimalist styles.<br/><br/><br/>

Security, insulation, and durability are always front of mind. Our doors are built to perform — featuring robust construction, weatherproof finishes, and premium ironmongery. Whether you choose double glazing, acoustic insulation, or custom finishes, we ensure your door offers both comfort and peace of mind.<br/><br/><br/>

We've completed door projects in homes across London, from classic Victorian terraces to sleek new-builds. Every piece is handcrafted or restored with precision and pride, giving you a door that stands the test of time — in both appearance and performance.<br/><br/><br/>

Explore our gallery below to see our recent work. From subtle elegance to bold statement pieces, each door reflects the care and quality we bring to every project.
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