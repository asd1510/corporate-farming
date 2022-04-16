import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';

import {API} from '../../backend';
import {isAuth} from '../../auth/authAPICalls';
import {getUnverifiedFarmers, getVerifiedFarmers, getInvalidFarmers, getVerificationEnums, updateVerification} from './adminAPICall';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';
import Topbar from "../../component/topbar/topbar";

import './manageVerification.css';

import { ReactComponent as Elink }  from '../../assets/external-link.svg'

const ManageVerification = () => {

    const [farmers, setFarmers] = useState([])
    const [verifiedFarmers, setVerifiedFarmers] = useState([])
    const [invalidFarmers, setInvalidFarmers] = useState([])
    const [loading, setLoading] = useState(true)

    const [statusEnums, setStatusEnums] = useState([])
    const [showSelect, setShowSelect] = useState(false)

    const {user, token} = isAuth();

    const preload = () => {
        getUnverifiedFarmers(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setFarmers(data)
            }
            setLoading(false);
        });

        getVerifiedFarmers(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setVerifiedFarmers(data)
            }
            setLoading(false);
        });

        getInvalidFarmers(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setInvalidFarmers(data)
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        preload();
        getEnums();
    }, []);

    const getEnums = () => {
        getVerificationEnums(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setStatusEnums(data);
                setShowSelect(true);
            }
        })
    }

    const handleChange = farmerId => event => {
        const farmerIdStatus = {
            "farmerId": farmerId,
            "verification":event.target.value
        }

        updateVerification(farmerId, user._id, token, farmerIdStatus)
        .then(data => {
            if(data.error)
                console.log(data.error);
        })
        window.location.reload();
    }

    if (loading){
        return <ThreeDotsWave/>;
    }

    return (
        <div className="text-dark">
            <Topbar/>
            <div className="text-center h1 mt-3">
                Verify Aadhaar Numbers
                <a href="https://myaadhaar.uidai.gov.in/verifyAadhaar" target="_blank">
                 <Elink style={{width:"1.5rem", marginLeft:"1rem"}}/>
                </a>
            </div>

            <div className="farmer-container">
                <div className="h2 mt-3">Unverified Farmers</div>
                {farmers.map((farmer, index) => {
                    return (
                        <div key={index}>
                            <div className="farmer-list-item">
                                <div className="item-name">{farmer.name}</div>
                                <div className="item-aadhaar"> {farmer.aadhaar} </div>
                                <select className="enumSelect" placeholder="Status" onChange={handleChange(farmer._id) }>
                                    <option>{farmer.verification}</option>
                                    {statusEnums.map((stat, index) => {
                                        return (
                                          <option value={stat} key={index}>{stat}</option>
                                          )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    )
                })}
            </div>


            <div className="farmer-container">
            <div className="h2 mt-3">Verified Farmers</div>
                {verifiedFarmers.map((farmer, index) => {
                    return (
                        <div key={index}>
                            <div className="farmer-list-item">
                                <div className="item-name">{farmer.name}</div>
                                <div className="item-aadhaar"> {farmer.aadhaar} </div>
                                <select className="enumSelect" placeholder="Status" onChange={handleChange(farmer._id) }>
                                    <option>{farmer.verification}</option>
                                    {statusEnums.map((stat, index) => {
                                        return (
                                          <option value={stat} key={index}>{stat}</option>
                                          )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    )
                })}

            </div>


            <div className="farmer-container">
            <div className="h2 mt-3">Invalid Farmers</div>
                {invalidFarmers.map((farmer, index) => {
                    return (
                        <div key={index}>
                            <div className="farmer-list-item">
                                <div className="item-name">{farmer.name}</div>
                                <div className="item-aadhaar"> {farmer.aadhaar} </div>
                                <select className="enumSelect" placeholder="Status" onChange={handleChange(farmer._id) }>
                                    <option>{farmer.verification}</option>
                                    {statusEnums.map((stat, index) => {
                                        return (
                                          <option value={stat} key={index}>{stat}</option>
                                          )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default ManageVerification;