import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      // Update the bookings state after successful deletion
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert('Booking canceled successfully!');
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Error canceling booking.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">
              Booking ID: {booking.bookingId}
            </h2>
            <p className="text-gray-700 mb-2">
              Hotel Name: {booking.hotelName}
            </p>
            <p className="text-gray-700 mb-2">
              Start Date: {new Date(booking.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              End Date: {new Date(booking.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              No of Persons: {booking.noOfPersons}
            </p>
            <p className="text-gray-700 mb-2">
              No of Rooms: {booking.noOfRooms}
            </p>
            <p className="text-gray-700 mb-2">
              Type of Room: {booking.typeOfRoom}
            </p>
            <div className="flex justify-end">
              <Link
                to={`/reschedule/${booking._id}`} // Link to RescheduleBooking page
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Reschedule
              </Link>
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;