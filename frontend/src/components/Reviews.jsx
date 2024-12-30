import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { hotelId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hotels/${hotelId}`);
        setReviews(response.data.reviews); // Assuming reviews are stored in an array within the hotel object
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [hotelId]); // Update reviews when hotelId changes

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers&#39; Reviews</h1>
      <div className="mt-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <p key={index} className="mb-2">
              {review}
            </p>
          ))
        ) : (
          <p>No reviews found for this hotel.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;