import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useAuthContext } from '../Auth/AuthContext';
import { CarCard } from './CarCard';
import styles from './CarsControl.module.css';

export function Paginate(props) {
  const { data } = props;
  const [cars, setCars] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const { user } = useAuthContext();
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCars(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <section className={styles['cars-list-container']}>
        <div className={styles['cars-title-container']}>
          <h1>CARS</h1>
        </div>
        {user.isAdmin && (
          <Link to="/cars/add" className={styles['add-car']}>
            Add car
          </Link>
        )}
        <div className={styles['cars-container']}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        className={styles['cars-list-pagination']}
      />
    </>
  );
}
