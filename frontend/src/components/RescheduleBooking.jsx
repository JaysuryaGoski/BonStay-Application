import  { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const RescheduleBooking = () => {
  const { bookingId } = useParams(); // Get bookingId from URL
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!startDate) {
      newErrors.startDate = 'Start Date is required';
    } else if (new Date(startDate) <= new Date()) {
      newErrors.startDate = 'Start Date should be greater than today';
    }

    if (!endDate) {
      newErrors.endDate = 'End Date is required';
    } else if (new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = 'End Date should be greater than or equal to Start Date';
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({}); // Clear previous errors
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        startDate,
        endDate,
      });

      if (response.status === 200) {
        setSuccessMessage('Booking rescheduled successfully!');
      } else {
        setSuccessMessage('An error occurred while rescheduling.');
      }
    } catch (error) {
      console.error('Error rescheduling booking:', error);
      setSuccessMessage('An error occurred while rescheduling.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reschedule Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${errors.startDate ? 'border-red-500' : ''}`}
          />
          {errors.startDate && <span className="text-red-500">{errors.startDate}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleChange}
            className={`border rounded-md p-2 w-full ${errors.endDate ? 'border-red-500' : ''}`}
          />
          {errors.endDate && <span className="text-red-500">{errors.endDate}</span>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Reschedule
        </button>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

export default RescheduleBooking;