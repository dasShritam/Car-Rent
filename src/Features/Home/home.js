import { useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { CarCard } from '../CarsControl/CarCard';
import bgphoto from '../../Components/Images/CarsOnTheRoad.jpg';
import styles from './Home.module.css';

export function Home() {
  const [query, setQuery] = useState('Cluj-Napoca');
  const [cars, setCars] = useState(null);
  const { user } = useAuthContext();

  function handleRequest(e) {
    e.preventDefault();
    fetch(`http://localhost:3005/cars?q=${query}`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }

  return (
    <section className={styles['home-container']}>
      <h1>Welcome to CONNECT car rentals</h1>

      {!user && (
        <>
          <h2>Please login or register to serch for cars</h2>
          <div className={styles['image-container']}>
            <img src={bgphoto} alt="Cars on the road" />
          </div>
        </>
      )}

      {user && !cars && (
        <>
          <h2>Please select a location and serch for cars</h2>
          <form onSubmit={handleRequest} className={styles['serch-form']}>
            <div className={styles['serch-fields']}>
              <label htmlFor="location">Location</label>
              <select
                type="text"
                name="location"
                id="location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              >
                <option value="Cluj-Napoca">Cluj-Napoca</option>
                <option value="Bucuresti">Bucuresti</option>
                <option value="Iasi">Iasi</option>
                <option value="Timisoara">Timisoara</option>
                <option value="Constanta">Constanta</option>
              </select>
            </div>
            <button className={styles['btn-search']}>Search for cars</button>
          </form>
          <div className={styles['image-container']}>
            <img src={bgphoto} alt="Cars on the road" />
          </div>
        </>
      )}
      {cars &&
        cars
          .filter((car) => car.available === true)
          .map((car) => {
            return (
              <div key={car.id} className={styles['car-card']}>
                <CarCard car={car} />
              </div>
            );
          })}
    </section>
  );
}
