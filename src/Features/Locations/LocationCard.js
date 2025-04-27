import { Link } from 'react-router-dom';
import { Map } from './Map';
import styles from './Locations.module.css';

export function LocationCard({ location }) {
  return (
    <article className={styles['location-card-container']}>
      <Link to={`/locations/${location.id}`}>
        <h2>{`${location.city}`} </h2>
      </Link>
      <p>Adress: {`${location.address}`}</p>
      <p>Phone nr: {` ${location.phone}`}</p>
      <Map key={location.id} location={location} className={styles['map']} />
    </article>
  );
}
