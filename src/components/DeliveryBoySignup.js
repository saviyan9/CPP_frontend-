import React, { useState } from 'react'
import "./DeliveryBoySignup.css";
import { useDispatch } from 'react-redux';
import { Connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { grey } from '@mui/material/colors';

import Alert from '@mui/material/Alert';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { constant } from '../constants';

import LinearProgress from '@mui/material/LinearProgress';

function DeliveryBoySignup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleEmailChange = (event) => {
        setFormData({ ...formData, email: event.target.value });
    }
    
    const handlePasswordChange = (event) => {
        setFormData({ ...formData, password: event.target.value });
    }

    const submitSignupForm = (e) => {
        if (formData.email !== ''  && formData.password !== '') {
            setLoader(true)

            e.preventDefault();

            const formdata = new FormData();
            formdata.append('email', formData.email);
            formdata.append('password', formData.password);

            axios.post(constant.API_URL + '/api/deliveryboy/register', formdata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {
                    setLoader(false)
                    if (res.status === 200) {
                        
                        localStorage.clear();
                        localStorage.setItem('deliveryboy', JSON.stringify(res.data));
                        alert("Account created suvccessfully!")
                        navigate('/')
                    } else {
                        alert(res.data)
                    }
                    console.log("Reso: ", res);
                })
                .catch(err => {
                    setError(true)
                    setLoader(false)
                    alert(err.response.data)
                });
        } else {
            setError(true)
        }
    }

    return (
        <div className='signup'>

            <div className='signup_container'>
                {
                    loader ? <LinearProgress /> : <></>
                }
                <br></br>
                <h2>Sign-up as Delivery Boy</h2>

                <div className='sp_form_and_button'>
                    <form >

                        <div className='inputField'>
                            <TextField className='inputField' fullWidth id="outlined-basic" value={formData.email} onChange={handleEmailChange} label="Email*" variant="outlined" />
                        </div>

                        <div className='inputField'>
                            <TextField fullWidth type="password" className='inputField' id="outlined-basic" value={formData.password} onChange={handlePasswordChange} label="Password*" variant="outlined" />
                        </div>
                    </form>


                    {
                        success ? <Alert severity="success">Logged in Successfully!</Alert> : (
                            error ? <Alert severity="error">Make sure you've entered the correct details</Alert> : <></>
                        )
                    }

                    <br></br>

                    <Button variant="contained" onClick={submitSignupForm}>
                        Create Account
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeliveryBoySignup
