'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import GalleryItem from '../components/GalleryItem'
import StandartBtn from '../components/StandartButton'
import './about.css';


export default function SashWindows() {
  const items = [
  { src: '/windows1.jpg', alt: 'Window 1', label: 'Classic Sash - White' },
  { src: '/windows2.jpg', alt: 'Window 2', label: 'Classic side-hung with bars' },
  { src: '/windows3.jpg', alt: 'Window 3', label: 'Arched Top - Oak Finish' },
  { src: '/windows4.jpg', alt: 'Window 4', label: 'Modern Grey with Transoms' },
  { src: '/windows5.jpg', alt: 'Window 5', label: 'Classic Sash - whole lotta bars' },
  { src: '/windows6.jpg', alt: 'Window 6', label: 'Modern white convex shaped' }
];

  return (
    <>
    <Header/>
    <div className='page-background'>
        <div className = 'page-content'>
            <h2 className = "page-header">About us</h2>
            <p className = "page-article">
              At Sash Studio, we bring together traditional woodworking skills and modern precision to create exceptional timber windows and doors across London. With years of hands-on experience and a deep respect for architectural heritage, our team is proud to deliver craftsmanship that stands the test of time.<br/><br/><br/>

We specialise in bespoke joinery — from casement and sash windows to front doors, French doors, and more. Every piece we produce is made with care, using sustainably sourced timber, durable finishes, and refined techniques. Whether we’re restoring original features or crafting something entirely new, our goal is always the same: to enhance the beauty, comfort, and value of your home.<br/><br/><br/>

As a local company, we understand the character of London’s architecture — from Georgian and Victorian terraces to modern builds. We work closely with homeowners, architects, and contractors to deliver tailored solutions that reflect your vision and respect the integrity of the property.<br/><br/><br/>

Attention to detail is at the heart of everything we do. From the initial consultation to the final fit, we take pride in offering a smooth, transparent, and highly personalised service. We’re not just building windows and doors — we’re building trust, one project at a time.<br/><br/><br/>

Explore our site to learn more about our work, or contact us to discuss your project. We’d be happy to help bring your ideas to life.


              </p>
          <div className="gallery-grid">
                    {items.map((item, i) => (
                      <GalleryItem key={i} {...item} />
                    ))}
          </div>
          <StandartBtn text = "See our works" link = "gallery" />
        </div>

        </div>
    <Footer/>
    </>
  )
} 