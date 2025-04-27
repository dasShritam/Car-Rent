import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './CarsControl.module.css';

export function CarCard({ car }) {
  return (
    <article className={styles['car-card']}>
      <Link to={`/cars/${car.id}`} className={styles['car-link']}>
        <h2>{`${car.make} ${car.model}`} </h2>
        <div className={styles['img-container']}>
          <img src={car.poster} alt={`${car.make} ${car.model} poster`} />
        </div>
        <div className={styles['car-info']}>
          <div className={styles['car-transmition']}>
            <FontAwesomeIcon icon={solid('code-fork')} />
            <p>{car.transmition}</p>
          </div>
          <div className={styles['car-seats']}>
            <FontAwesomeIcon icon={solid('user')} />
            <p>{car.seats}</p>
          </div>
          <div className={styles['car-trunkspace']}>
            <FontAwesomeIcon icon={solid('suitcase')} />
            <p>{car.trunkspace}</p>
          </div>
          <div className={styles['car-fuel']}>
            <FontAwesomeIcon icon={solid('gas-pump')} />
            <p>{car.fuel}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
