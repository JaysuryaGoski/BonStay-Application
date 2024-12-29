import { useState } from "react";
import axios from "axios";

const Login = ()=>{
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
    });
    const [errorMessage,setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrorMessage("");
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {userId, password} = formData;
        if(!formData.userId){
            setErrorMessage("User ID is required");
            return ;
        }
        if(!formData.password){
            setErrorMessage("Password is required");
            return;
        }else if(formData.password.length < 8){
            setErrorMessage("Password should be atleast of 8 characters");
            return;
        }
    

    try {
        const response = await axios.post("http://localhost:5000/api/login",{
            userId,
            password
        });
        setSuccessMessage("Login successful");
        setErrorMessage("");
        setFormData({
            userId :"",
            password: ""
        });
        console.log("Token:",response.data.token);
    } catch (error) {
        setErrorMessage(
            error.response?.data?.error || "An error occured while logging in"
        );
        setSuccessMessage("");
    }
}
    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/background-image.jpg')" }}>
          <div className="bg-white shadow-lg rounded-lg px-8 py-8 md:py-12 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6 text-brown-700">BonStay with Us</h2>
    
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}
    
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="userId">
                  UserId:
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-brown-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brown-500 text-white py-2 px-4 rounded-lg hover:bg-brown-600 focus:outline-none focus:ring focus:ring-brown-300"
              >
                Login
              </button>
            </form>
    
            <p className="text-sm text-center mt-4 text-gray-600">
              <a href="/register" className="text-brown-500 hover:underline">
                Sign Up
              </a>{" "}
              to create a new account.
            </p>
          </div>
        </div>
      );
    };
    
    export default Login;
