import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { Modal } from './ModalUserProfile';
import styles from './Auth.module.css';

export function UserProfile() {
  const { id } = useParams();
  const { accessToken } = useAuthContext();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // retype_password: '',
    phone: '',
    adress: '',
    country: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // retype_password: '',
    phone: '',
    adress: '',
    country: '',
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3005/users/' + id)
      .then((res) => res.json())
      .then((data) => setValues(data));
  }, [id]);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

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

    let { retype_password, ...dataForServer } = values;

    const data = await fetch('http://localhost:3005/users/' + values.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (data) {
      setMessage('The profile was successfully updated!');
    }
    setTimeout(() => navigate('/'), 2000);
  }

  return (
    <section className={styles['user-edit-container']}>
      <div className={styles['user-edit-container-fluid']}>
        <h1 className={styles['user-title-edit']}>
          Hello {values.firstName} {values.lastName}
        </h1>

        <form onSubmit={handleSubmit} className={styles['user-info-container']}>
          {message && <p className={styles['success-message']}>{message}</p>}
          <p className={styles['user-info']}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
          </p>
          {errors.firstName && (
            <p className={styles['error-message']}>{errors.firstName}</p>
          )}
          <p className={styles['user-info']}>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
          </p>
          {errors.lastName && (
            <p className={styles['error-message']}>{errors.lastName}</p>
          )}
          <p className={styles['user-info']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </p>
          {errors.email && (
            <p className={styles['error-message']}>{errors.email}</p>
          )}
          <p className={styles['user-info']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </p>
          {errors.password && (
            <p className={styles['error-message']}>{errors.password}</p>
          )}
          {/* <p className={styles['user-info']}>
            <label htmlFor="retype_password">Retype Password</label>
            <input
              type="password"
              name="retype_password"
              id="retype_password"
              value={values.retype_password}
              onChange={handleInputChange}
            />
          </p>
          {errors.retype_password && (
            <p className={styles['error-message']}>{errors.retype_password}</p>
          )} */}
          <p className={styles['user-info']}>
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
          <p className={styles['user-info']}>
            <label htmlFor="adress">Adress</label>
            <input
              type="text"
              name="adress"
              id="adress"
              value={values.adress}
              onChange={handleInputChange}
            />
          </p>
          {errors.adress && (
            <p className={styles['error-message']}>{errors.adress}</p>
          )}
          <p className={styles['user-info']}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={values.country}
              onChange={handleInputChange}
            />
          </p>
          {errors.country && (
            <p className={styles['error-message']}>{errors.country}</p>
          )}

          <div className={styles['edit-delete-container']}>
            <button className={styles['btn-edit-profile']}>
              Edit your profile
            </button>
            <div className={styles['delete-container']}>
              <button
                className={styles['btn-delete-user']}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Delete user
              </button>
              {openModal && <Modal closeModal={setOpenModal} />}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function validateForm(values) {
  const validation = {
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // retype_password: '',
      phone: '',
      adress: '',
      country: '',
    },
    isValid: true,
  };

  if (!values.firstName) {
    validation.isValid = false;
    validation.errors.firstName = 'Please enter your first name.';
  }

  if (!values.lastName) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your last name.';
  }

  /* eslint-disable no-control-regex*/
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid email address';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      'Please enter a password that is at least 6 characters long.';
  }

  // if (values.password !== values.retype_password) {
  //   validation.isValid = false;
  //   validation.errors.retype_password = 'The two passwords do not match.';
  // }

  if (!values.phone) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your phone number.';
  }

  if (!values.adress) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your adress.';
  }

  if (!values.country) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your country.';
  }

  return validation;
}
