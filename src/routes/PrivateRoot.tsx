import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {

    return localStorage.getItem('accessToken') !== null;
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
