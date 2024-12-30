import  { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn } = useContext(); 

  return (
    <nav className="bg-brown-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BonStay</h1>
        <ul className="flex space-x-6">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-gray-300">Hotels</Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-gray-300">Bookings</Link>
              </li>
              <li>
                {/* Add Logout functionality here */}
                <Link to="/logout" className="hover:text-gray-300">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;