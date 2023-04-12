import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';



export default function Carouselcard(props) {
  const navigate = useNavigate();

  const viewFoodDetails = (id) => {
    navigate('/details/' + id)
  }
  return (
    <div>
      <Card className='h-100 border shadow' style={{ width: '18rem' }} onClick={() => viewFoodDetails(props.id)}>
        <Card.Img variant="top" src={props.url} />
        <Card.Body>
          <Card.Title>{props.name.slice(0, 50) + "...."}</Card.Title>
          <Card.Text>
            {props.discription.slice(0, 50) + "...."}
          </Card.Text>
          {/* <Button variant="primary">Buy now</Button> */}
        </Card.Body>
      </Card>
    </div>
  )
}
