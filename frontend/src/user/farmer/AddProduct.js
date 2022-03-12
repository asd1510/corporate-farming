import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';

import './add.css';
import {isAuth} from '../../auth/authAPICalls'
import {addProductToDB} from './farmerAPICalls'

const AddProduct = () => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        farmer: '',
        cropName: '',
        cropSubType: '',
        price: '',
        paymentBeforeharvest: '',
        minimumOrderQuantity:'',
        maximumOrderQuantity:'',
        harvestMonth:'',
        deliveryMonth:'',
        createdProduct:'',
        error: '',
        success: false
    });

    const {
        title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest, minimumOrderQuantity, maximumOrderQuantity, harvestMonth, deliveryMonth,
        createdProduct, error, success
    } = values;

    const {user, token} = isAuth();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none"}}>
                <h4>{createdProduct} created Successfully</h4>
            </div>
        )
    }

      const errorMessage = () => {
          return (
              <div className="alert alert-danger mt-3" style={{display: error ? "" : "none"}}>
                  <h4>{error}</h4>
              </div>
          )
      }

      const onSubmit = event => {
          event.preventDefault()
          setValues({...values, error: false})
          const prod = {title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest, minimumOrderQuantity, maximumOrderQuantity, harvestMonth, deliveryMonth};
          addProductToDB(user._id, token, prod)
          .then(data => {
              if(data.error){
                  setValues({...values, error: data.error});
              }
              else{
                  setValues({...values,
                      title: '',
                      description: '',
                      farmer: '',
                      cropName: '',
                      cropSubType: '',
                      price: '',
                      paymentBeforeharvest: '',
                      minimumOrderQuantity:'',
                      maximumOrderQuantity:'',
                      harvestMonth:'',
                      deliveryMonth:'',
                      createdProduct: data.title,
                  });
              }
          })
      }

      return (

        <div className="add-main bg-cont-product">
            <div className="add-container">
                {successMessage()}
                {errorMessage()}

                <form method="POST" className="add-form" id="land-form">
                    <Link to={`/farmer/dashboard/${isAuth().user._id}`} className="btn btn-md btn-dark mr-4">Dashboard</Link>
                    <h2 className="add-heading" align="center">Fruits & Veggies</h2>
                    <div className="form-group-1">
                        <input className="add-input-select" type="text" name="title" onChange={handleChange("title")} value={title} placeholder="Title" required />
                        <input className="add-input-select" type="text" name="description" onChange={handleChange("description")} value={description} placeholder="Description" required />
                        <input className="add-input-select" type="text" name="cropName" onChange={handleChange("cropName")} value={cropName} placeholder="Crop" required />
                        <input className="add-input-select" type="text" name="cropSubType" onChange={handleChange("cropSubType")} value={cropSubType} placeholder="Crop - Subtype" />
                        <input className="add-input-select" type="number" name="price" onChange={handleChange("price")} value={price} placeholder="Price (per kg.)" min="1" required />
                        <input className="add-input-select" type="number" name="paymentBeforeharvest" onChange={handleChange("paymentBeforeharvest")} value={paymentBeforeharvest} placeholder="Payment before Harvest" min="1" required />
                        <input className="add-input-select" type="number" name="minimumOrderQuantity" onChange={handleChange("minimumOrderQuantity")} value={minimumOrderQuantity} placeholder="Minimum Production Capacity (kg.)" min="1" required />
                        <input className="add-input-select" type="number" name="maximumOrderQuantity" onChange={handleChange("maximumOrderQuantity")} value={maximumOrderQuantity} placeholder="Maximum Production Capacity (kg.)" min="1" required />
                        <div style={{color:'black'}}>Harvest Month<input type="month" name="harvestMonth" onChange={handleChange("harvestMonth")} value={harvestMonth}/></div>
                        <div style={{color:'black'}}>Delivery Month<input type="month" name="deliveryMonth" onChange={handleChange("deliveryMonth")} value={deliveryMonth}/></div>
                    </div>
                    <div className="form-submit" style={{marginTop: '10%', marginLeft: '40%'}}>
                        <input className="add-input-select" type="submit" name="submit" onClick={onSubmit} className="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>


    )

}

export default AddProduct;