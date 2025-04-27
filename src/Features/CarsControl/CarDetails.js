import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import { Modal } from './Modalcars';
import styles from './CarsControl.module.css';

export function CarDetails() {
  const { id } = useParams();
  const { user, accessToken } = useAuthContext();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3005/api/cars/' + id)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, [id]);

  if (!car) {
    return <strong>Loading ...</strong>;
  }

  function bookCar() {
    fetch('http://localhost:3005/cars/' + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ available: false }),
    })
      .then((res) => res.json())
      .then((data) => setMessage('Your car awaits for you'));

    setTimeout(() => navigate('/'), 2000);
  }

  return (
    <div className={styles['details-container']}>
      <h1>
        {car.make} {car.model}
      </h1>
      {message && <p className={styles['success-message']}>{message}</p>}
      <div className={styles['car-details-container']}>
        <div className={styles['img-container']}>
          <img src={car.poster} alt={`${car.make} ${car.model}`} />
        </div>
        <div className={styles['car-details']}>
          <div className={styles['car-details-description']}>
            <p>First registration:</p>
            <p>Seats:</p>
            <p>Category:</p>
            <p>Mileage:</p>
            <p>Fuel:</p>
            <p>Transmition:</p>
            <p>Trunkspace:</p>
            <p>Location:</p>
          </div>
          <div className={styles['car-details-values']}>
            <p>{car.year}</p>
            <p>{car.seats}</p>
            <p>{car.category}</p>
            <p>{car.mileage}</p>
            <p>{car.fuel}</p>
            <p>{car.transmition}</p>
            <p>{car.trunkspace}</p>
            <p>{car.location}</p>
          </div>
        </div>
      </div>
      {user.isAdmin && (
        <div className={styles['edit-delete-container']}>
          <Link to={`/cars/edit/${id}`} className={styles['link-edit-car']}>
            Edit this car
          </Link>
          <div className={styles['delete-container']}>
            <button
              className={styles['btn-delete-car']}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Delete car
            </button>
            {openModal && <Modal closeModal={setOpenModal} />}
          </div>
        </div>
      )}
      {user && (
        <button onClick={bookCar} className={styles['btn-book-car']}>
          Book now
        </button>
      )}
    </div>
  );
}
