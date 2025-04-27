import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <ul className={styles['footer-menu-container']}>
        <li>
          <Link to={`/termsandconditions`}>Terms & conditions</Link>
        </li>
        <li>
          <Link to={`/privacynotice`}>Privacy Notice</Link>
        </li>
        <li>
          <a href="http://anpc.ro">ANPC</a>
        </li>
        <li>
          <Link to={`/contact`}>Contact</Link>
        </li>
        <li className={styles['copywright']}>
          <FontAwesomeIcon icon={regular('copyright')} />
          <p> CONNECT 2022</p>
        </li>
      </ul>
    </footer>
  );
}
