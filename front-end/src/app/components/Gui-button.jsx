import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GuiButton({ Text, link, isDropdown, items }) {

    const router = useRouter();

    const handleClick = () => {
        if(!isDropdown) {
            router.push(`/${link.toLowerCase()}`);
        }
    };

  return (
    <div className="dropdown">
        <button onClick={handleClick}  className = "gui-button dropdown">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">{Text}</span>
        </button>
        {Array.isArray(items) && isDropdown && (
            <div className="dropdownContent">
                {items.map((item, index) => (
                    <Link key={index} href={`/${item.link.toLowerCase()}`}>
                        <button className = "gui-button dropdown">
                            <span className="circle1"></span>
                            <span className="circle2"></span>
                            <span className="circle3"></span>
                            <span className="circle4"></span>
                            <span className="circle5"></span>
                            <span className="text">{item.Name}</span>
                        </button>
                    </Link>
                ))}
            </div>
        )}  
    </div>
  )
}