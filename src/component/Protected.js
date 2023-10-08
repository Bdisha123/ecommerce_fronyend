import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const Protected=({isAuthenticated, children}) => {
    if(isAuthenticated===false) {
        return <Navigate to={"/login"} />;
    }

    return children? children:<Outlet />;
};

export default Protected;