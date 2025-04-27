import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import { Map } from './Map';
import { Modal } from './ModalLocations';
import styles from './Locations.module.css';

export function LocationDetails() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [location, setLocation] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3005/api/locations/' + id)
      .then((res) => res.json())
      .then((data) => setLocation(data));
  }, [id]);

  if (!location) {
    return <strong>Loading ...</strong>;
  }

  return (
    <div className={styles['location-details-container']}>
      <h1>{location.city}</h1>
      <p>Address: {location.address}</p>
      <p>Phone nr.: {location.phone}</p>
      <Map key={location.id} location={location} />

      {user.isAdmin && (
        <div className={styles['edit-delete-location-container']}>
          <Link
            to={`/locations/edit/${id}`}
            className={styles['link-edit-location']}
          >
            Edit this location
          </Link>
          <div className={styles['delete-container']}>
            <button
              className={styles['btn-delete-location']}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Delete location
            </button>
            {openModal && <Modal closeModal={setOpenModal} />}
          </div>
        </div>
      )}
    </div>
  );
}
