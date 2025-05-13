import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
 const router = useRouter();


  return (
    <header>
        <div className='header-content'>
          <a href="" className='hover-link'>Email Us</a>
          <Link href="/">
            <img src="https://www.whyteandwood.com/wp-content/uploads/2017/06/WhyteWood-logo-1024x173-2.png" alt="" />
          </Link>
          <a href="" className='hover-link'>017 5341 5753</a>
        </div>
    </header>
  );
}

