import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import './FoodDetail.css'
// import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import MUIButton from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import { constant } from '../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Carouselcard from './Carouselcard';


function FoodDetails() {
	const data = useSelector((state) => state);
	const [foodData, setFoodData] = useState([])
	const navigate = useNavigate();


	function distance(lat1, lon1, lat2, lon2) {
		const R = 6371; // Radius of the Earth in km
		const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
		const dLon = (lon2 - lon1) * Math.PI / 180;

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const distance = R * c; // Distance in km

		console.log(distance)
		return distance;
	}

	function extractLatLongFromMapsUrl(url) {
		console.log('url:', url);
		const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
		if (match) {
			const latitude = match[1];
			const longitude = match[2];
			return { latitude, longitude };
		} else {
			return null;
		}
	}


	const [formValues, setFormValues] = useState({
		distance: 0,
		time: '',
		quantity: 1
	});

	const params = useParams();
	const [selectedFood, setSelectedFood] = useState([])

	const handleQuantitychange = (event) => {
		setFormValues({ ...formValues, quantity: event.target.value });
		console.log(formValues.quantity, "values")
	}

	useEffect(() => {
		console.log('Id: ', params.id)
		
		const formdata = new FormData();
		formdata.append('id', params.id);

		axios.post(constant.API_URL + '/api/food/getfooddetails', formdata, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => {
				console.log(res)
				setSelectedFood(res.data)
				setFormValues({ ...formValues, preparingtime: res.data.preparingtime });

				const userLatlong = extractLatLongFromMapsUrl(JSON.parse(localStorage.getItem('user')).location);
				const foodLatLong = extractLatLongFromMapsUrl(res.data.location);
				let dist = distance(foodLatLong.latitude, foodLatLong.longitude, userLatlong.latitude, userLatlong.longitude)
				setFormValues({ ...formValues, distance: dist });
				let totalTime = res.data.preparingtime + (dist / 25) * 60
				setFormValues({ ...formValues, time: totalTime.toString() });

				console.log("Distance is: ", dist, formValues.distance)
			})
			.catch(err =>
				console.log("This is the error", err),
			);


		axios.get(constant.API_URL + '/api/food/getfoods')
			.then((res) => {
				console.log(res)
				setFoodData(res.data)
				// console.log("foods", foods)
			})
			.catch(err => {
				console.log("Frontend err: ", err)
			});
	}, [params.id])

	const buyProduct = (id, name, price, location) => {

		if (localStorage.getItem('user')) {



			console.log(id, name, price, location)
			const userLatlong = extractLatLongFromMapsUrl(JSON.parse(localStorage.getItem('user')).location);
			const foodLatLong = extractLatLongFromMapsUrl(location);
			let dist = distance(foodLatLong.latitude, foodLatLong.longitude, userLatlong.latitude, userLatlong.longitude)

			const formdata = new FormData();
			formdata.append('foodId', id);
			formdata.append('foodName', name);
			formdata.append('price', price * formValues.quantity);
			formdata.append('restaurantLocation', location);

			formdata.append('userId', JSON.parse(localStorage.getItem('user'))._id);
			formdata.append('userName', JSON.parse(localStorage.getItem('user')).firstname + ' ' + JSON.parse(localStorage.getItem('user')).lastname);
			formdata.append('userPhone', '9820223032');
			formdata.append('userLocation', JSON.parse(localStorage.getItem('user')).location);

			formdata.append('distance', dist);
			formdata.append('quantity', formValues.quantity);

			axios.post(constant.API_URL + '/api/transaction/createtransaction', formdata, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(res => {

					console.log(res)

					if (res.status === 200) {
						alert("Ordered successfully!");
					}
				})
				.catch(err => {

					console.log(err)
				});

		}else{
			alert("Please sign in as a user to Order food")
			navigate('/login')
		}
	}

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1024 },
			items: 4,
		},
		desktop: {
			breakpoint: { max: 1024, min: 800 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 800, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	const food = foodData.map(item => (
		<Carouselcard id={item._id} name={item.name} url={item.image} price={item.price} discription={item.description} />

	))


	return (
		<>

			{/* <!-- single product --> */}
			<div className="single-product ">
				<div className="container ">
					<div className="row">
						<div className="col-md-5  border shadow">
							<div className="single-product-img">
								<img src={selectedFood.image} alt="" />
								{/* Image Here */}
							</div>
						</div>
						<div className="col-md-7">
							<div className="single-product-content ms-3" style={{ justifyContent: 'flex-start', display: 'flex', flexDirection: 'column' }}>
								<p className="fw-bold fs-3 my-3">{selectedFood.name}</p>
								<p className="deatiltext">{selectedFood.description}</p>
								{/* <div style={{justifyContent:'flex-start', display: 'flex', alignItems:'center'}}>
								<DeliveryDiningIcon sx={{fontSize:'40px', marginLeft:'0px', marginRight:'5px'}} /><p className="d-flex justify-content-start my-3 fw-bold">{formValues.distance.slice(0,4)} Km</p>
								</div> */}
								<MUIButton sx={{ width: '150px' }} href={selectedFood.location} target="_blank" rel="noreferrer">View Restaurant</MUIButton>
								<p className="d-flex justify-content-start my-3 fw-bold"><strong className='text-muted'>Expected delivery time: {formValues.time.slice(0, formValues.time.indexOf('.'))} minutes</strong>{ }</p>

								<br></br>

								<div className="single-product-form">
									<form>
										<input className="qnty d-flex" type="number" onChange={handleQuantitychange} placeholder={formValues.quantity} value={formValues.quantity} />
									</form>
									<br></br>
									<p className="d-flex fw-bold fs-5 justify-content-start"> $ {selectedFood.price * formValues.quantity}</p>

									<button type="button" onClick={() => buyProduct(selectedFood._id, selectedFood.name, selectedFood.price, selectedFood.location)} className="d-flex btn btn-success mt-3 justify-content-start"><FontAwesomeIcon className='mt-1 pe-2' icon={faCartShopping} />Buy Now</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end single product --> */}

			<div id='relate' class="row mt-5">
				<div class="col-lg-8 offset-lg-2 text-center">
					<div class="section-title">
						<h3 className='fw-bold'>Suggested <span class="orange-text fw-bold">For You</span></h3>
						<p className='text-muted'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
					</div>
				</div>
			</div>


			<div className='row my-3 mx-5'>

				<Carousel responsive={responsive}>

					{food}

				</Carousel>;
			</div>

		</>
	)
}





export default FoodDetails;

