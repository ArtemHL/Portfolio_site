import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  return (
    <footer>
  <div className="footer-content">
    <div className="footer-article">
      <h3>Contact Us</h3>
      <p>Phone: +44 74 9892 7693</p>
      <p>Phone: +44 73 0100 2233</p>
      <p>Email: sashstudio.web@gmail.com</p>
    </div>
    <div className="footer-article">
      <h3>Quick Links</h3>
      <a href="/">Home</a>
      <a href="/about-us">About Us</a>
      <a href="/sash-windows">Sash Windows</a>
      <a href="/casment-windows">Gallery</a>
      <a href="/calculator">Calculator</a>
      <a href="/staircases">Staircases</a>
      <a href="/doors">Doors</a>
      <a href="/contact">Contact Us</a>
    </div>
    <div className="footer-article">
      <h3>Follow Us</h3>
      <a href="https://www.facebook.com/share/1BxF2HmsZo/" target="_blank" >Facebook</a>
      <a href="https://www.instagram.com/sashstudio.uk?igsh=b29lY2w1cHN1aW95" target="_blank">Instagram</a>
    </div>
  </div>
</footer>

  );
}