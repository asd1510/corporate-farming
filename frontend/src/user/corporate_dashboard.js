import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {signout} from '../auth/authAPICalls';
import {isAuth} from '../auth/authAPICalls';
import Topbar from '../component/topbar/topbar';
import './dashboard.css';

const CorporateDashboard = ({ match }) => {

    const signoutUser = () => {
        signout()
    }

    const {user: {name, email, role, verification}} = isAuth();


    var roleType = "Farmer";
    if(role === 1)
        roleType = "Corporate";

    const adminLeftSide = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/contract/manage/" className="text-success" style={{ textDecoration:'none'}}>Manage Contracts</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="mb-4">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Name</div> {name}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Email</div> {email}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Role</div> {roleType}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Status</div> {verification}
                    </li>

                </ul>
                <Link to="/signin" onClick={signoutUser} className="btn btn-primary mt-3 pull-right text-white">Sign Out</Link>
            </div>
        );
    };

    return (

        <div className="">
            <Topbar/>
            <h1 className="text-center mt-5 mb-5">Corporate Dashboard</h1>
            <div className="container bg-green p-3">
                <div className="row">
                    <div className="col-sm-3">{adminLeftSide()}</div>
                    <div className="col-sm-9">{adminRightSide()}</div>
                </div>
            </div>

        </div>
    );
}

export default CorporateDashboard;
