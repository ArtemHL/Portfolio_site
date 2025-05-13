import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
 const router = useRouter();


  return (
    <footer>
            <ul className='footer-content'>
            <li>
                <a href="">Terms and Conditions</a>
            </li>
            <li>
                <a href="">Privacy Policy</a>
            </li>
            <li>
                <a href="">Cookie Policy</a>
            </li>
            </ul>
            <ul className='footer-content'>
            <li>
                <a href="">Terms and Conditions</a>
            </li>
            <li>
                <a href="">Privacy Policy</a>
            </li>
            <li>
                <a href="">Cookie Policy</a>
            </li>
            </ul>
            <ul className='footer-content'>
            <li>
                <a href="">Terms and Conditions</a>
            </li>
            <li>
                <a href="">Privacy Policy</a>
            </li>
            <li>
                <a href="">Cookie Policy</a>
            </li>
            </ul>
    </footer>
    );
}