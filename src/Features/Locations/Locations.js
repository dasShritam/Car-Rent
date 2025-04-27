import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import { LocationCard } from './LocationCard';
import styles from './Locations.module.css';

export function Locations() {
  const [locations, setLocations] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3005/api/locations')
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  if (!locations) {
    return <strong>Loading ...</strong>;
  }

  return (
    <section className={styles['locations-list-container']}>
      <div className={styles['locations-title-container']}>
        <h1>LOCATIONS</h1>
      </div>
      {user.isAdmin && (
        <Link to="/locations/add" className={styles['add-location']}>
          Add location
        </Link>
      )}
      <div className={styles['locations-list']}>
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </section>
  );
}
