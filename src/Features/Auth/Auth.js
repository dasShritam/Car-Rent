import clsx from 'clsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Navigate, useLocation } from 'react-router-dom';
import styles from './Auth.module.css';

import { useAuthContext } from './AuthContext';

export function Auth() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retype_password: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retype_password: '',
    serverError: '',
  });
  const { login, accessToken } = useAuthContext();

  const { pathname } = useLocation();
  const isRegister = pathname === '/register';

  if (accessToken) {
    return <Navigate to="/" />;
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values, isRegister);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    let apiPath = 'register';
    if (!isRegister) {
      dataForServer = {
        email: values.email,
        password: values.password,
      };
      apiPath = 'login';
    }

    const data = await fetch(`http://localhost:3005/api/${apiPath}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }

    login(data);
  }

  return (
    <section className={styles['register-container']}>
      <div className={styles['register-container-fluid']}>
        <h1 className={styles['title-register']}>
          {isRegister ? 'Register' : 'Login'}
        </h1>
        {errors.serverError && (
          <p className={styles['error-message-incorect']}>
            <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
            {errors.serverError}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className={styles['register-info-container']}
        >
          {isRegister && (
            <>
              <p className={styles['register-field']}>
                <label htmlFor="firstName">First Name</label>
                <input
                  className={clsx('border rounded border-black ml-1', {
                    'border-red-800': errors.firstName,
                  })}
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
              <p className={styles['register-field']}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={clsx('border rounded border-black ml-1', {
                    'border-red-800': errors.lastName,
                  })}
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
            </>
          )}

          <p className={styles['register-field']}>
            <label htmlFor="email">Email</label>
            <input
              className={clsx('border rounded border-black ml-1', {
                'border-red-800': errors.email,
              })}
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
          <p className={styles['register-field']}>
            <label htmlFor="password">Password</label>
            <input
              className={clsx('border rounded border-black ml-1', {
                'border-red-800': errors.password,
              })}
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

          {isRegister && (
            <>
              <p className={styles['register-field']}>
                <label htmlFor="retype_password">Retype password</label>
                <input
                  className={clsx('border rounded border-black ml-1', {
                    'border-red-800': errors.retype_password,
                  })}
                  type="password"
                  name="retype_password"
                  id="retype_password"
                  value={values.retype_password}
                  onChange={handleInputChange}
                />
              </p>
              {errors.retype_password && (
                <p className={styles['error-message']}>
                  {errors.retype_password}
                </p>
              )}
            </>
          )}
          <p>
            <button className={styles['btn-register']}>
              {isRegister ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

function validateForm(values, isRegister) {
  const validation = {
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retype_password: '',
    },
    isValid: true,
  };

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

  if (isRegister) {
    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = 'The two passwords do not match.';
    }

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = 'Please enter your first name.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = 'Please enter your last name.';
    }
  }

  return validation;
}
