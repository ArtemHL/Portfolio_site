import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GUI from './gui.jsx';
import MobileGui from './mobileGui.jsx';
import { useState } from 'react';

export default function Header() {
 const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);


  return (
    <div className="headerGui-outline">
    <header>
        <div className='header-content'>
          <a href="" className='hover-link'>073 0100 2233</a>
          <Link href="/" className="header-logo">
            <span className="logo-text">Sash Studio</span>
          </Link>
          <a href="" className='hover-link'>074 9892 7693</a>
        </div>
    </header>
     <GUI />
     <div className = "mobile-only">
        <button
      className="sidebar-toggle"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>
      { showSidebar && <MobileGui />}
     </div>
    </div>
  );
}

