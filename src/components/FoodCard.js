import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { constant } from '../constants';

function FoodCard({ id, name, description, price, image, location, preparingtime }) {
    const navigate = useNavigate();

    const viewFoodDetails = (id) => {
        navigate('/details/' + id)
    }


    return (
        <div style={{ margin: '10px' }} onClick={() => viewFoodDetails(id)}  >
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="200"
                    sx={{ marginTop: 0 }}
                    image={image}
                    alt="Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name.slice(0, 50) + "...."}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Description: </strong>{description.slice(0, 50) + "...."}
                    </Typography>
                    <br></br>
                    <Typography component="div">
                        Price: ${price}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default FoodCard
