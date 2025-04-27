import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './Footer.module.css';

export function Contact() {
  return (
    <section className={styles['contact-container']}>
      <h1>
        CONNECT <span>car rentals</span>
      </h1>
      <div className={styles['contact-details-container']}>
        <div>
          <div className={styles['contact-details']}>
            <FontAwesomeIcon icon={solid('location-dot')} />
            <p>Adress</p>
          </div>
          <p>str.Traian Vuia nr.149-151, Cluj-Napoca</p>
        </div>
        <div>
          <div className={styles['contact-details']}>
            <FontAwesomeIcon icon={regular('envelope')} />
            <p>Email</p>
          </div>
          <p>connect@connect.ro</p>
        </div>
        <div>
          <div className={styles['contact-details']}>
            <FontAwesomeIcon icon={solid('mobile-screen')} />
            <p>Phone</p>
          </div>
          <p>0264 1122334</p>
        </div>
        <div>
          <div className={styles['contact-details']}>
            <FontAwesomeIcon icon={solid('fax')} />
            <p>Fax</p>
          </div>
          <p>0264 1122335</p>
        </div>
        <div>
          <div className={styles['contact-details']}>
            {/* <FontAwesomeIcon icon={whatsapp('whatsapp')} /> */}
            <p>Whatsapp</p>
          </div>
          <p>0744 7897890</p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5464.2136777510605!2d23.687959098377473!3d46.78249909977349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sro!2sro!4v1661598199752!5m2!1sro!2sro`,
        }}
      ></div>
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5464.2136777510605!2d23.687959098377473!3d46.78249909977349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sro!2sro!4v1661598199752!5m2!1sro!2sro"
        width="600"
        height="450"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Connect Cluj-Napoca"
      ></iframe> */}
    </section>
  );
}
