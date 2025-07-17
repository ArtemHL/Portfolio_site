import GuiButton from "./Gui-button"

export default function GUI() {
  return (
    <div className="gui-container">
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
  )
}