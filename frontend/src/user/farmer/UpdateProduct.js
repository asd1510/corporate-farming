import React, {useState, useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';

import './add.css';
import {isAuth} from '../../auth/authAPICalls'
import {getProduct} from '../../component/product/productAPICall'
import {updateProductInDB} from './farmerAPICalls'
import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';

const UpdateProduct = () => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        cropName: '',
        cropSubType: '',
        price: '',
        paymentBeforeharvest: '',
        minimumOrderQuantity:'',
        maximumOrderQuantity:'',
        harvestMonth:'',
        deliveryMonth:'',
        updatedProduct:'',
        error: '',
        success: false,
        saving: false,
    });

    const {
        title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest, minimumOrderQuantity, maximumOrderQuantity, harvestMonth, deliveryMonth,
        updatedProduct, error, success, saving
    } = values;

    const [loading, setLoading] = useState(true)

    const {user, token} = isAuth();
    const { productId } = useParams();

    const preload = (productId) => {
        getProduct(productId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values,
                    title: data.title,
                    description: data.description,
                    cropName: data.cropName,
                    cropSubType: data.cropSubType,
                    price: data.price,
                    paymentBeforeharvest: data.paymentBeforeharvest,
                    minimumOrderQuantity: data.minimumOrderQuantity,
                    maximumOrderQuantity: data.maximumOrderQuantity,
                    harvestMonth: data.harvestMonth,
                    deliveryMonth: data.deliveryMonth,
                    saving:false,
                });
            }
            setLoading(false);
        })
        .catch()
    };

    useEffect(() => {
        preload(productId);
    }, [])

    if (loading){
        return <ThreeDotsWave/>;
    }


    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="success"
                style={{ display: updatedProduct ? '' : 'none' }}
            >
                <h5><Link to={`/product/${productId}`} className="text-primary">{updatedProduct}</Link> Updated Successfully</h5>
            </Alert>
        )
    }

    const errorMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="danger"
                style={{ display: error ? '' : 'none' }}
            >
                <h5>{error}</h5>
            </Alert>
        )
    }



  const onSubmit = event => {
      event.preventDefault()
      setValues({...values, error: false, saving: true})
      const prod = {title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest, minimumOrderQuantity, maximumOrderQuantity, harvestMonth, deliveryMonth};

      updateProductInDB(productId, user._id, token, prod)
          .then(data => {
              if(data.error){
                  setValues({...values, error: data.error, saving: false});
              }
              else{
                  console.log(data);
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
                      saving: false,
                      updatedProduct: data.title,
                  });
              }
          })
      }

      return (

        <>
        <Topbar/>
        <CircleModal saving={saving}/>

        <div className="add-main bg-cont-product">
            <div className="add-container">
                {errorMessage()}

                <form method="POST" className="add-form">
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
                        <input className="add-input-select" type="submit" name="submit" onClick={onSubmit} className="submit" value="Update" />
                    </div>
                    {successMessage()}
                </form>
            </div>
        </div>
        </>

    )

}
export default UpdateProduct;