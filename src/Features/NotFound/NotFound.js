import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <section className={styles['not_found-container']}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>Please check out our car fleet or our locations</p>

      <Link to={`/`}>Go to home page</Link>
    </section>
  );
}
