import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { constant } from '../constants';

import Carousel from 'react-bootstrap/Carousel';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import './Home.css'

import FoodCard from './FoodCard';

import Pic1 from '../Images/banner1.jpg'
import Pic2 from '../Images/banner2.jpg'
import Pic3 from '../Images/banner3.jpg'




import { setProducts } from "../redux/actions/actions";


function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const [foods, setFoods] = useState([])

  useEffect(() => {
    if (data.products.buttons.searchButton === true) {
      setFoods(data.products.searchproducts)
    } else {
      axios.get(constant.API_URL + '/api/food/getfoods')
        .then((res) => {
          console.log(res)
          setFoods(res.data)
          dispatch(setProducts(res.data));
          console.log("foods", data)
        })
        .catch(err => {
          console.log("Frontend err: ", err)
        });
    }
  }, [data.products.buttons])



  return (
    <div>
      <br></br> <br></br>
      <div>
        <Carousel fade>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src={Pic1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Crunchy Burgers</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Pic2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Barista</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Pic3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Indian Foods</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className='foods'>
        {
          foods.length > 0 ? foods.map((item, index) =>
            <div>
              <FoodCard
                id={item._id}
                // ownerId={item.ownerId}
                name={item.name}
                description={item.description}
                category={item.category}
                price={item.price}
                image={item.image}
              // link={item.link}
              // date={item.sellingDate}
              />
            </div>
          ) : <h1>No products found</h1>
        }
      </div>
    </div>
  )
}

export default Home
