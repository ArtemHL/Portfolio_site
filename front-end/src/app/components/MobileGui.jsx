import { useRouter } from 'next/navigation';
import './components.css';
import GuiButton from './Gui-button';

export default function MobileGui() {
  const router = useRouter();

  return (
   <>
     <div className="sidebar-container">
        <GuiButton Text="Home" link = '' />
                <GuiButton Text="About Us" link = 'about-us' />
                <GuiButton Text="Windows" isDropdown = {true} items = {
                    [
                    {Name: "Sash Windows", link: 'sash-windows'}, 
                    {Name: "Casement Windows", link: 'casment-windows'}]} />
                <GuiButton Text="Doors" link = 'doors' />
                <GuiButton Text="Staircases"  link = 'staircases' />
                <GuiButton Text="Gallery" link = 'gallery' />
                <GuiButton Text="Calculator" link = 'calculator' />
                <GuiButton Text="Contact" link = 'contact' />
     </div>
   </>
  );
}


