import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const response = await axios.get('/api/tours');
      setTours(response.data);
    };

    fetchTours();
  }, []);

  return (
    <div className="home">
      <h1>Ekskursijų katalogas</h1>
      <div className="tour-list">
        {tours.map((tour) => (
          <div key={tour._id} className="tour">
            <Link to={`/tour/${tour._id}`}>
              <img src={tour.image} alt={tour.title} />
              <h2>{tour.title}</h2>
              <p>Trukmė: {tour.duration}</p>
              <p>Kaina: {tour.price} EUR</p>
              <p>Įvertinimas: {tour.rating}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;