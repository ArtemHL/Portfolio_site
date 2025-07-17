import { useRouter } from 'next/navigation';
import './components.css';

export default function StandartBtn({ text, type, link }) {
  const router = useRouter();

    const handleClick = () => {
        if(type !== 'submit') {
            router.push(`/${link.toLowerCase()}`);
        }
    }

  return (
   <button className="fancyform" type = {type} onClick = {handleClick} >
                  <span className="top-key"></span>
                  <span className="text">{text}</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
    </button>
  );
}


