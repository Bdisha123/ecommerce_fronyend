import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute=({isAdmin, element: Element, ...rest}) => {
    const {loading, isAuthenticated}=useSelector((state) => state.user);

    return (
        <Fragment>
            {loading===false&&(
                <Outlet
                    {...rest}
                    render={(props) => {
                        isAuthenticated? <Outlet />:<Navigate to="/login" replace />;

                        // if (isAuthenticated === false) {
                        //   return <Navigate to="/login" replace />;
                        // }

                        return <Element {...props} />;
                    }}
                />
            )}
        </Fragment>
    );
};

export default ProtectedRoute;