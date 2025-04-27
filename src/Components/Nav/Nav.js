import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../Features';
import logo from '../Images/logo.jpg';

import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuthContext();

  return (
    <nav className={styles['main-menu']}>
      <div className={styles['nav-container']}>
        <ul>
          <li>
            <NavLink className={styles['logo']} to="/">
              <img src={logo} alt="Bussines logo" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/locations"
            >
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/cars"
            >
              Cars
            </NavLink>
          </li>

          {user && (
            <li className={styles['push-right']}>
              <Link to={`/users/${user.id}`}>Welcome, {user.firstName}! </Link>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </li>
          )}

          {!user && (
            <>
              <li className={styles['push-right']}>
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
