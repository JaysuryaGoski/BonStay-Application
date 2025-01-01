import { BrowserRouter, Routes, Route,useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from './context/DataProvider';
import Login from './pages/Login';
import Registration from "./pages/Registration"
import Home from './pages/Home';
import Hotels from './components/Hotels';
import DataProvider from './context/DataProvider';

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(DataContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};
export default App;