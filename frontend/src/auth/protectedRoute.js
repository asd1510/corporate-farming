import React from 'react';
import {Route, Navigate} from 'react-router-dom';

import {isAuth} from './authAPICalls';

const PrivateRoute = ({ children }) => {
    return isAuth() ? children : <Navigate to='/signin' />;
}

const FarmerRoute = ({ children }) => {
    return (isAuth() && isAuth().user.role === 0 && isAuth().user.verification=="Verified") ? children : <Navigate to='/signin' />;
}

const CorporateRoute = ({ children }) => {
    return (isAuth() && isAuth().user.role === 1) ? children : <Navigate to='/signin' />;
}

const AdminRoute = ({ children }) => {
    return (isAuth() && isAuth().user.role === 2) ? children : <Navigate to='/signin' />;
}

export {
    PrivateRoute,
    CorporateRoute,
    FarmerRoute,
    AdminRoute
}
