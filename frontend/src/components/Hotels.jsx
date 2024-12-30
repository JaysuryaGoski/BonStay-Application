import { useState, useEffect } from "react";
import axios from "axios";

const Hotels = () =>{
    const [hotels, setHotels] = useState([]);
    
    useEffect(()=>{
        const fetchHotels = async()=>{
            try {
                const response = await axios.get("http://localhost:5000/api/hotels");
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels: ",error);
            }
        }
        fetchHotels();
    },[]);
    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Available Hotels</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hotels.map((hotel) => (
              <div key={hotel._id} className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                <p className="text-gray-700 mb-2">City: {hotel.city}</p>
                <p className="text-gray-700 mb-2">Amenities: {hotel.amenities.join(', ')}</p>
                <p className="text-gray-700 mb-2">Address: {hotel.address}</p>
                <p className="text-gray-700 mb-2">Contact: {hotel.contact}</p>
                <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Book a Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Hotels;
