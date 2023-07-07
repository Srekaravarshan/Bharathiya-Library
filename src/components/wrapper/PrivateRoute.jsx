import React, { Children } from "react";
import { useStateValue } from "../../StateProvider";
import { Navigate, Outlet, Route, useLocation, useNavigate } from "react-router-dom";
import { authentication } from "../../firebase";

// const PrivateRoute = ({element: Element, ...rest}) => {

//   const [{ basket, user }, dispatch] = useStateValue();

//   return(
//     <Route render/>
//     )
// }

export const PrivateRoute = (props) => {
  // const [{ basket, user }, dispatch] = useStateValue();
  const location = useLocation();
    if (props.isLoggedIn) {
      return <>{props.children}</>
    } else {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
};
