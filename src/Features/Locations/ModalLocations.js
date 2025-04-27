import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';

import styles from './Locations.module.css';

export function Modal({ closeModal }) {
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { id } = useParams();

  async function handleDeleteUser() {
    await fetch('http://localhost:3005/locations/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-content-header']}>
          <h2>Delete location</h2>
          <button
            onClick={() => closeModal(false)}
            className={styles['modal-close']}
          >
            &times;
          </button>
        </div>
        <div className={styles['modal-body']}>
          <p>Are you sure you want to delete this location?</p>
        </div>
        <div className={styles['modal-footer']}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteUser();
              logout();
              navigate('/');
            }}
            className={styles['btn-modal-decision']}
          >
            Yes
          </button>
          <button
            onClick={() => closeModal(false)}
            className={styles['btn-modal-decision']}
          >
            No{' '}
          </button>
        </div>
      </div>
    </div>
  );
}
