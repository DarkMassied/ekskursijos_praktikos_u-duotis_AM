import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const response = await axios.get('/api/tours');
      setTours(response.data);
    };

    const fetchBookings = async () => {
      const response = await axios.get('/api/bookings');
      setBookings(response.data);
    };

    fetchTours();
    fetchBookings();
  }, []);

  const handleDeleteTour = async (id) => {
    await axios.delete(`/api/tours/${id}`);
    setTours(tours.filter(tour => tour._id !== id));
  };

  const handleConfirmBooking = async (id) => {
    await axios.put(`/api/bookings/${id}`, { status: 'confirmed' });
    setBookings(bookings.map(booking => booking._id === id ? { ...booking, status: 'confirmed' } : booking));
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <h2>Tours</h2>
      <ul>
        {tours.map(tour => (
          <li key={tour._id}>
            {tour.title} - {tour.price} EUR
            <button onClick={() => handleDeleteTour(tour._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            {booking.user.name} booked {booking.tour.title} on {new Date(booking.date).toLocaleDateString()} - {booking.status}
            {booking.status === 'pending' && <button onClick={() => handleConfirmBooking(booking._id)}>Confirm</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
