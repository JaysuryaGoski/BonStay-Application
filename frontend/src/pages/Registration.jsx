import axios from "axios";
import { useState } from "react";

const Registration = () =>{
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        emailId: "",
        phoneNo: "",
        password: ""
    });
    const [errors,setErrors] = useState({});
    const validateForm = ()=>{
        const validationErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!formData.name){
            validationErrors.name = "Name is Required";
        }else if(formData.name.length < 3){
            validationErrors.name = "Name should have atleast 3 characters";
        }
        if(!formData.address){
            validationErrors.address = "Address is required";
        }
        if(!formData.emailId){
            validationErrors.emailId = "Email ID is required";
        }else if(emailRegex.test(formData.emailId)){
            validationErrors.emailId = "Email ID should follow valid pattern";
        }
        if(!formData.phoneNo){
            validationErrors.phoneNo = "Phone No is required";
        }else if(!/^\d{10}$/.test(formData.phoneNo)){
            validationErrors.phoneNo = "Phone No should have exactly 10 digits";
        }
        if(!formData.password){
            validationErrors.password = "Password is required";
        }else if(formData.password.length < 8){
            validationErrors.password = "Password should have atleast 8 characters";
        }
        return validationErrors;

    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrors({...errors, [e.target.name]: ""});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const validationErrors = validateForm();
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/register",formData);
            alert("User Registered Successfully");
        } catch (error) {
            alert(error.response?.data?.error || "Registration failed");
        }
    }
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
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Welcome to BonStay</h2>
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
                  <label className="block text-gray-600 text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
    
                <div>
                  <label className="block text-gray-600 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.emailId ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>}
                </div>
    
                <div>
                  <label className="block text-gray-600 text-sm font-medium">Phone No</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                      errors.phoneNo ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
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
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Register
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    };
    
    export default Registration
