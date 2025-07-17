import './components.css'

export default function GalleryItem({ src, alt, label }) {
  return (
    <div className="gallery-item">
      <img src={src} alt={alt} className="gallery-image" />
      <div className="gallery-label">{label}</div>
    </div>
  )
}