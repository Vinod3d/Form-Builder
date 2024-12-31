/* eslint-disable react/display-name */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// HOC to check user authentication
const withAuth = (WrappedComponent) => {
  return (props) => {
    const {isAuthenticated} = useSelector((state) => state.user);
    console.log(isAuthenticated)

    if (!isAuthenticated) {
      return <Navigate to="/login"/>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
