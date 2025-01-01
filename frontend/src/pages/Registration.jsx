import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    emailId: "",
    phoneNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const validationErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name) {
      validationErrors.name = "Name is Required";
    } else if (formData.name.length < 3) {
      validationErrors.name = "Name should have at least 3 characters";
    }
    if (!formData.address) {
      validationErrors.address = "Address is required";
    }
    if (!formData.emailId) {
      validationErrors.emailId = "Email ID is required";
    } else if (!emailRegex.test(formData.emailId)) {
      validationErrors.emailId = "Email ID should follow valid pattern";
    }
    if (!formData.phoneNo) {
      validationErrors.phoneNo = "Phone No is required";
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      validationErrors.phoneNo = "Phone No should have exactly 10 digits";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should have at least 8 characters";
    }
    return validationErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      setSuccessMessage("Registration successful. Please login to continue.");
      setFormData({
        name: "",
        address: "",
        emailId: "",
        phoneNo: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setErrors({ ...errors, general: error.response?.data?.error || "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-4/5 md:w-3/5 lg:w-2/5">
        {/* Left Image Section */}
        <div
          className="w-1/2 bg-cover bg-center hidden lg:block"
          style={{
            backgroundImage: "url('https://via.placeholder.com/300')",
          }}
        ></div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#964B00]">Register with BonStay</h2>
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#964B00] text-white py-2 px-4 rounded-md hover:bg-brown-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-[#964B00] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};
export default Registration;