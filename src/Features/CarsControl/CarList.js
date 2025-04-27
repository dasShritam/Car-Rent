import { useEffect, useState } from 'react';
import { Paginate } from './Pagination';

export function CarList() {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  if (!cars) {
    return <strong>Loading...</strong>;
  }

  return (
    <div>
      <Paginate data={cars} />
    </div>
  );
}
