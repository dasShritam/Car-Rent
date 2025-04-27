import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import styles from './CarsControl.module.css';

export function AddCar() {
  const [values, setValues] = useState({
    make: '',
    model: '',
    poster: '',
    category: 'Mini',
    year: '',
    mileage: '',
    seats: '',
    trunkspace: '',
    fuel: 'Benzin',
    transmition: 'Manual',
    location: 'Cluj-Napoca',
  });
  const [errors, setErrors] = useState({
    make: '',
    model: '',
    poster: '',
    category: '',
    year: '',
    mileage: '',
    seats: '',
    trunkspace: '',
    fuel: '',
    transmition: '',
    location: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { accessToken, user } = useAuthContext();

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    if (e.target.type === 'checkbox') {
      setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const data = await fetch('http://localhost:3005/cars', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());

    if (data) {
      setMessage('The car was added successfully');
    }

    setTimeout(() => navigate('/cars'), 2000);
  }

  return (
    <section className={styles['car-add-container']}>
      <div className={styles['car-add-container-fluid']}>
        <h1 className={styles['title-add']}>Add Car</h1>

        <form onSubmit={handleSubmit} className={styles['car-info-container']}>
          {message && <p className={styles['success-message']}>{message}</p>}
          <p className={styles['car-property']}>
            <label htmlFor="make">Make</label>
            <input
              type="text"
              name="make"
              id="make"
              value={values.make}
              onChange={handleInputChange}
            />
          </p>
          {errors.make && (
            <p className={styles['error-message']}>{errors.make}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              id="model"
              value={values.model}
              onChange={handleInputChange}
            />
          </p>
          {errors.model && (
            <p className={styles['error-message']}>{errors.model}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="poster">Poster</label>
            <input
              type="text"
              name="poster"
              id="poster"
              value={values.poster}
              onChange={handleInputChange}
            />
          </p>
          {errors.poster && (
            <p className={styles['error-message']}>{errors.poster}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={values.category}
              onChange={handleInputChange}
            >
              <option value="Mini">Mini</option>
              <option value="Compact">Compact</option>
              <option value="Medium">Medium</option>
              <option value="Full-Size">Full-Size</option>
              <option value="Minivan">Minivan</option>
              <option value="Van">Van</option>
              <option value="Suv">Suv</option>
              <option value="Premium SUV">Premium SUV</option>
            </select>
          </p>
          {errors.category && (
            <p className={styles['error-message']}>{errors.category}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              value={values.year}
              onChange={handleInputChange}
            />
          </p>
          {errors.year && (
            <p className={styles['error-message']}>{errors.year}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="mileage">Mileage</label>
            <input
              type="text"
              name="mileage"
              id="mileage"
              value={values.mileage}
              onChange={handleInputChange}
            />
          </p>
          {errors.mileage && (
            <p className={styles['error-message']}>{errors.mileage}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="seats">Seats</label>
            <input
              type="number"
              name="seats"
              id="seats"
              value={values.seats}
              onChange={handleInputChange}
            />
          </p>
          {errors.seats && (
            <p className={styles['error-message']}>{errors.seats}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="trunkspace">Trunkspace</label>
            <input
              type="text"
              name="trunkspace"
              id="trunkspace"
              value={values.trunkspace}
              onChange={handleInputChange}
            />
          </p>
          {errors.trunkspace && (
            <p className={styles['error-message']}>{errors.trunkspace}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="fuel">Fuel</label>
            <select
              name="fuel"
              id="fuel"
              value={values.fuel}
              onChange={handleInputChange}
            >
              <option value="Benzin">Benzin</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Elecric">Elecric</option>
              <option value="Hydrogen">Hydrogen</option>
            </select>
          </p>
          {errors.fuel && (
            <p className={styles['error-message']}>{errors.fuel}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="transmition">Transmition</label>
            <select
              name="transmition"
              id="transmition"
              value={values.transmition}
              onChange={handleInputChange}
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </p>
          {errors.transmition && (
            <p className={styles['error-message']}>{errors.transmition}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="location">Location</label>
            <select
              type="text"
              name="location"
              id="location"
              value={values.location}
              onChange={handleInputChange}
            >
              <option value="Cluj-Napoca">Cluj-Napoca</option>
              <option value="Bucuresti">Bucuresti</option>
              <option value="Iasi">Iasi</option>
              <option value="Timisoara">Timisoara</option>
              <option value="Constanta">Constanta</option>
            </select>
          </p>
          {errors.location && (
            <p className={styles['error-message']}>{errors.location}</p>
          )}
          <p className={styles['car-property']}>
            <label htmlFor="available">Available</label>
            <input
              type="checkbox"
              name="available"
              id="available"
              onChange={handleInputChange}
            />
          </p>

          <p>
            <button className={styles['btn-add-car']}>Add Car</button>
          </p>
        </form>
      </div>
    </section>
  );
}

function validateForm(values) {
  const validation = {
    errors: {
      brand: '',
      model: '',
      poster: '',
      category: '',
      year: '',
      mileage: '',
      seats: '',
      trunkspace: '',
      fuel: '',
      transmition: '',
      location: '',
    },
    isValid: true,
  };

  if (!values.brand) {
    validation.isValid = false;
    validation.errors.brand = 'Please enter car brand';
  }

  if (!values.model) {
    validation.isValid = false;
    validation.errors.model = 'Please enter a car model.';
  }

  if (!values.poster) {
    validation.isValid = false;
    validation.errors.poster = 'Please enter a image adress or url';
  }

  if (!values.category) {
    validation.isValid = false;
    validation.errors.category = 'Please select a category.';
  }

  if (!values.year) {
    validation.isValid = false;
    validation.errors.year = 'Please enter the year of first registration.';
  }

  if (!values.mileage) {
    validation.isValid = false;
    validation.errors.mileage = 'Please enter the cars&rsquo;s mileage.';
  }

  if (!values.seats) {
    validation.isValid = false;
    validation.errors.seats = 'Please enter the number of seat&rsquo;s.';
  }

  if (!values.trunkspace) {
    validation.isValid = false;
    validation.errors.trunkspace =
      'Please enter the number of bags that fit in the trunk.';
  }

  if (!values.fuel) {
    validation.isValid = false;
    validation.errors.fuel = 'Please select the type of fuel.';
  }

  if (!values.transmition) {
    validation.isValid = false;
    validation.errors.transmition = 'Please select the type of transmition.';
  }

  if (!values.location) {
    validation.isValid = false;
    validation.errors.location = 'Please select a location.';
  }

  return validation;
}
