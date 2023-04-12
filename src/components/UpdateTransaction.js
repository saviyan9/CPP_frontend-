import React, { useState } from 'react'
import "../components/UpdateTransaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck, faTruckFast, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { constant } from '../constants';


import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


function UpdateTransaction() {
    const [loader, setLoader] = useState(false);
    const [transaction, setTransaction] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const [liveLoc, setLiveLoc] = useState('')

    const handleLiveLocationchange = (event) => {
        setLiveLoc(event.target.value)
    }



    useEffect(() => {
        if (localStorage.getItem('deliveryboy')) {
            console.log(params.id)
            const formdata = new FormData();
            formdata.append('id', params.id);

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
        } else {
            navigate('/deliveryboysignup')
        }
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
                if(res.status===200){
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
                if(res.status===200){
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

                <h1 class="tit">Delivery</h1>

                <div className='ul_form_and_button'>
                    <form >
                        <p className="d-flex justify-content-start my-1 fw-bold"><strong className='text-muted'>Name: </strong>{transaction.userName}</p>
                        <p className="d-flex justify-content-start my-1 fw-bold"><strong className='text-muted'>Phone: </strong>{transaction.userPhone}</p>
                        <p className="d-flex justify-content-start my-1 fw-bold"><strong className='text-muted'>Price: </strong>₹{transaction.price}</p>

                        {
                            transaction.distance ?
                                <p className="d-flex justify-content-start my-1 fw-bold"><strong className='text-muted'>Distance: </strong>{transaction.distance.slice(0, 4)} Km</p>
                                :
                                <></>
                        }

                        <Button sx={{ width: '200px' }} href={transaction.userLocation} target="_blank" rel="noreferrer">View Delivery Location</Button>

                        
                    </form>

                    {
                        (transaction.status === 'ordered')?
                        <>
                        <div className='inputField'>
                            <TextField className='inputField' onChange={handleLiveLocationchange} label="Enter Live Location*" variant="outlined" />
                        </div>
                        <br></br>
                        <br></br>
                        <button type="button" onClick={updateFirst} class=" py-3 btn btn-danger m-3 btn-sm"><FontAwesomeIcon className="mx-2" icon={faMotorcycle} size="lg" />Out for Delivery</button>
                        </>
                        :
                        (
                           (transaction.status === 'Out for delivery')?
                           <button onClick={updateSecond} type="button" class="py-3 btn btn-success m-3 btn-sm"><FontAwesomeIcon className="mx-2" icon={faHouseCircleCheck} size="lg" />Delivered</button>
                           :
                           <></>

                        )
                    }



                </div>
            </div>
        </div>
    )
}

export default UpdateTransaction
