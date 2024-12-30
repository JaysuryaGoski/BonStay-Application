import { useState } from "react";
import axios from "axios";

const BookRoom = ()=>{
    const [formData, setFormData] = useState({
        startDate :"",
        endDate : "",
        noOfPersons: "",
        noOfRooms : "",
        typeOfRoom : ""
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = ()=>{
        const validationErrors = {};

        if(!formData.startDate){
            validationErrors.startDate = "Start Date is required";
        }
        if(!formData.endDate){
            validationErrors.endDate = "End Date is required";
        }else if(new Date(formData.startDate) > new Date(formData.endDate)){
            validationErrors.endDate = "End Date should be greater than or equal to Start Date";
        }
        if (!formData.noOfPersons) {
            validationErrors.noOfPersons = "Number of Persons is required";
        } else if (
            formData.noOfPersons < 1 ||
            formData.noOfPersons > 5
        ) {
            validationErrors.noOfPersons = "Number of Persons should be between 1 and 5";
        }
    
        if (!formData.noOfRooms) {
            validationErrors.noOfRooms = "Number of Rooms is required";
        } else if (
            formData.noOfRooms < 1 ||
            formData.noOfRooms > 3
        ) {
            validationErrors.noOfRooms = "Number of Rooms should be between 1 and 3";
        }
    
        if (!formData.typeOfRoom) {
            validationErrors.typeOfRoom = "Type of Room is required";
        }
    
        return validationErrors;
    }
    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
        setErrors({
            ...errors, [e.target.name] : ""
        });
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        try {
          const response = await axios.post("http://localhost:5000/api/bookings", formData);
    
          if (response.status === 201) {
            setSuccessMessage("Booking created successfully!");
          } else {
            setSuccessMessage("An error occurred while booking.");
          }
        } catch (error) {
          console.error("Error booking room:", error);
          setSuccessMessage("An error occurred while booking.");
        }
      }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg flex w-4/5 md:w-3/5 lg:w-2/5">
            {/* Left Image Section  */}
            <div
              className="w-1/2 bg-cover bg-center hidden lg:block"
              style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}
            ></div>
    
            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Book a Room
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium">
                    No of Persons
                  </label>
                  <input
                    type="number"
                    name="noOfPersons"
                    value={formData.noOfPersons}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.noOfPersons ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.noOfPersons && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.noOfPersons}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium">
                    No of Rooms
                  </label>
                  <input
                    type="number"
                    name="noOfRooms"
                    value={formData.noOfRooms}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.noOfRooms ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.noOfRooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.noOfRooms}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium">
                    Type of Room
                  </label>
                  <select
                    name="typeOfRoom"
                    value={formData.typeOfRoom}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.typeOfRoom ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">-- Select Room Type --</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Standard">Standard</option>
                  </select>
                  {errors.typeOfRoom && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.typeOfRoom}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Book
                </button>
              </form>
              {successMessage && (
                <p className="text-green-500 mt-4">{successMessage}</p>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default BookRoom;
    
