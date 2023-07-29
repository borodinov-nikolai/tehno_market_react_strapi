import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ name, price, img }) => {
  const [animation, setAnimation] = React.useState('animate__animated animate__flipInY')
  return (
    <Card style={{ width: '14rem'}} onMouseEnter={()=>{setAnimation("animate__animated animate__headShake")}} onMouseLeave={()=>setAnimation("")} className={animation} data-item='item'>
      <Card.Body>
        <Card.Img variant="top" src={img} height='200px' width='225px' />
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Цена: {price}
        </Card.Text>
        <div className='d-flex justify-content-end'><Button variant="primary">В корзину</Button></div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard