import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";  // Assuming you're using some state management

// AuthorizeUser - Checks if the user has a valid token for access
export const AuthorizeUser = ({ children }) => {
    // Retrieve token from localStorage (or you can also use your global store)
    const token = localStorage.getItem('token');

    // If no token, redirect to the login page (or home page in your case)
    if (!token) {
        return <Navigate to={'/'} replace={true} />;
    }

    // If token exists, return children (the protected route)
    return children;
};

// ProtectRoute - Checks if the user has a username (assumed logged-in state)
export const ProtectRoute = ({ children }) => {
    // Access username from global state (or from any other state management)
    const username = useAuthStore(state => state.auth.username);

    // If no username (user not logged in), redirect to home (or login page)
    if (!username) {
        return <Navigate to={'/'} replace={true} />;
    }

    // If username exists, return children (the protected route)
    return children;
};
