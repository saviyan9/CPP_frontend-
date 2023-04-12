import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck, faTruckFast, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { constant } from '../constants';
import './MyOrders.css'


import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


function MyOrders() {
    const [loader, setLoader] = useState(false);
    const [transaction, setTransaction] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const [liveLoc, setLiveLoc] = useState('')

    const handleLiveLocationchange = (event) => {
        setLiveLoc(event.target.value)
    }


    useEffect(() => {

        console.log(params.id)
        const formdata = new FormData();
        formdata.append('id', JSON.parse(localStorage.getItem('user'))._id);

        axios.post(constant.API_URL + '/api/transaction/myorders', formdata, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log(res)
                setTransaction(res.data)
            })
            .catch(err =>
                console.log("This is the error", err),
            );
    }, [])

    const updateFirst = () => {
        const formdata = new FormData();
        formdata.append('id', params.id);
        formdata.append('liveloc', liveLoc);
        axios.post(constant.API_URL + '/api/transaction/updateone', formdata, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("Order updated successfully")
                }
                axios.post(constant.API_URL + '/api/transaction/gettransaction', formdata, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => {

                        console.log(res)
                        setTransaction(res.data)
                    })
                    .catch(err =>
                        console.log("This is the error", err),
                    );
            })
            .catch(err =>
                console.log("This is the error", err),
            );
    }

    const updateSecond = () => {
        const formdata = new FormData();
        formdata.append('id', params.id);
        axios.post(constant.API_URL + '/api/transaction/updatetwo', formdata, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("Order updated successfully")
                }
                axios.post(constant.API_URL + '/api/transaction/gettransaction', formdata, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => {
                        console.log(res)
                        setTransaction(res.data)
                    })
                    .catch(err =>
                        console.log("This is the error", err),
                    );
            })
            .catch(err =>
                console.log("This is the error", err),
            );
    }



    return (
        <div className='userlogin'>
            <br></br>
            <br></br>

            <div className='userlogin_container'>

                {
                    loader ?
                        <LinearProgress /> : <></>
                }

                <ba></ba> <br></br>

                <h1 class="tit">Your Orders</h1>

                <div className='orders'>

                    {
                        transaction.length > 0 ? transaction.map((item, index) =>
                            <div className='order'>
                                <h5 className="d-flex justify-content-start my-2 fw-bold"><strong className='text-muted'>Order Name: </strong>{item.foodName}</h5>
                                <h5 className="d-flex justify-content-start my-2 fw-bold"><strong className='text-muted'>Payment: </strong>₹{item.price}</h5>
                                <h5 className="d-flex justify-content-start my-2 fw-bold"><strong className='text-muted'>Status: </strong>{item.status}</h5>

                                {
                                    (item.status==='Out for delivery')?
                                    <Button sx={{ width: '159px' }} href={item.liveLocation} target="_blank" rel="noreferrer">View Live location</Button>
                                    :
                                    <></>
                                }

                                
                            </div>
                        ) : <h1>No products found</h1>
                    }




                    <br></br> <br></br>


                </div>
            </div>
        </div>
    )
}

export default MyOrders
