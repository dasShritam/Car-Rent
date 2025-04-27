import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import styles from './Locations.module.css';

export function AddLocation() {
  const [values, setValues] = useState({
    city: '',
    address: '',
    phone: '',
    map: '',
  });
  const [errors, setErrors] = useState({
    city: '',
    address: '',
    phone: '',
    map: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { accessToken, user } = useAuthContext();

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const data = await fetch('http://localhost:3005/locations', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());

    if (data) {
      setMessage('The location was added successfully');
    }

    setTimeout(() => navigate('/locations'), 2000);
  }

  return (
    <section className={styles['location-add-container']}>
      <div className={styles['location-add-container-fluid']}>
        <h1 className={styles['title-add']}>Add Location</h1>
        <form
          onSubmit={handleSubmit}
          className={styles['location-info-container']}
        >
          {message && <p className={styles['succes-message']}>{message}</p>}
          <p className={styles['location-property']}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={values.city}
              onChange={handleInputChange}
            />
          </p>
          {errors.city && (
            <p className={styles['error-message']}>{errors.city}</p>
          )}
          <p className={styles['location-property']}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </p>
          {errors.address && (
            <p className={styles['error-message']}>{errors.address}</p>
          )}
          <p className={styles['location-property']}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={values.phone}
              onChange={handleInputChange}
            />
          </p>
          {errors.phone && (
            <p className={styles['error-message']}>{errors.phone}</p>
          )}
          <p className={styles['location-property']}>
            <label htmlFor="map">Map</label>
            <input
              type="text"
              name="map"
              id="map"
              value={values.map}
              onChange={handleInputChange}
            />
          </p>
          {errors.map && (
            <p className={styles['error-message']}>{errors.map}</p>
          )}

          <p>
            <button className={styles['btn-add-location']}>Add Location</button>
          </p>
        </form>
      </div>
    </section>
  );
}

function validateForm(values) {
  const validation = {
    errors: {
      city: '',
      address: '',
      phone: '',
      map: '',
    },
    isValid: true,
  };

  if (!values.city) {
    validation.isValid = false;
    validation.errors.city = 'Please enter a city name.';
  }

  if (!values.address) {
    validation.isValid = false;
    validation.errors.address = 'Please enter a location address.';
  }

  if (!values.phone) {
    validation.isValid = false;
    validation.errors.phone = 'Please enter phone number';
  }

  if (!values.map) {
    validation.isValid = false;
    validation.errors.map = 'Please enter a google maps url.';
  }

  return validation;
}
