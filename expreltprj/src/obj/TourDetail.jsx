import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      const response = await axios.get(`/api/tours/${id}`);
      setTour(response.data);
    };

    fetchTour();
  }, [id]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tour-detail">
      <img src={tour.image} alt={tour.title} />
      <h1>{tour.title}</h1>
      <p>Trukmė: {tour.duration}</p>
      <p>Kaina: {tour.price} EUR</p>
      <p>Įvertinimas: {tour.rating}</p>
      <p>{tour.description}</p>
      <h2>Datos</h2>
      <ul>
        {tour.dates.map((date, index) => (
          <li key={index}>{new Date(date).toLocaleDateString()}</li>
        ))}
      </ul>
      <Link to={`/book/${tour._id}`} className="btn">Užsirašyti</Link>
    </div>
  );
};

export default TourDetail;
