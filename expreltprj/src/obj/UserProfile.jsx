import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userId = 'user-id-from-context-or-local-storage'; // replace with actual logic to get user ID

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h3>Booked Tours</h3>
      <ul>
        {user.bookedTours.map((tour) => (
          <li key={tour._id}>
            {tour.title} - {new Date(tour.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
