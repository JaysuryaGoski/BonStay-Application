import  { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get hotelId from URL

const AddReview = () => {
  const { hotelId } = useParams(); // Get hotelId from URL
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!review) {
      newErrors.review = 'Review is required';
    }

    return newErrors;
  };

  const handleChange = (event) => {
    setReview(event.target.value);
    setErrors({}); // Clear previous errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:5000/api/hotels/${hotelId}`, {
        review,
      });

      if (response.status === 200) {
        setSuccessMessage('Review added successfully!');
      } else {
        setSuccessMessage('An error occurred while adding review.');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      setSuccessMessage('An error occurred while adding review.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={review}
            onChange={handleChange}
            rows={5}
            className={`border rounded-md p-2 w-full ${errors.review ? 'border-red-500' : ''}`}
          />
          {errors.review && <span className="text-red-500">{errors.review}</span>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Review
        </button>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

export default AddReview;