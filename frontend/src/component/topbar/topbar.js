import "./topbar.css";
import { Search, Person, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";

import {isAuth, signout} from '../../auth/authAPICalls';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <em className="logo">Corp-Farm</em>
        </Link>
      </div>
      <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input
          placeholder="Search for lands/ products"
          className="searchInput"
        />
   
    </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {isAuth() && (
          <Link
            to={`/cropDP/`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <em className="topbarLink">Crop Disease Prediction</em>
          </Link>
          )}
          {isAuth() && (
          <Link
            to={`/cropPrediction/`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <em className="topbarLink">Crop-prediction</em>
          </Link>
          )}
          {!isAuth() && (
            <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
              <em className="topbarLink">SignIn</em>
            </Link>
           )}
          {!isAuth() && (
            <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
              <em className="topbarLink">SignUp</em>
            </Link>
            )}  
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
          {isAuth() && (
            <Chat />
          )}
          </div>
          <div className="topbarIconItem">
          {isAuth() && isAuth().user.role === 0 && (
                       
            <Link to={`/farmer/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'white'}}>
              <Person />
            </Link>
                               
          )}  
          {isAuth() && isAuth().user.role === 1 && (
                              
            <Link to={`/corporate/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'white'}}>
              <Person />
            </Link>
                                      
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
