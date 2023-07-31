import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ name, price, img }) => {
  const [animation, setAnimation] = React.useState('animate__animated')
  return (
    <Card style={{ width: '235px', }} onMouseEnter={()=>{setAnimation("animate__animated animate__headShake")}} onMouseLeave={()=>setAnimation("")} className={animation} data-item='item'>
      <Card.Body>
        <div className='d-flex justify-content-center' ><Card.Img variant="top" src={img} style={{height:'180px', width: 'auto'}} /></div>
        <Card.Title className='mt-2' >{name}</Card.Title>
        <Card.Text >
          Цена: {price}p
        </Card.Text>
        <div className='d-flex justify-content-end'><Button variant="primary">В корзину</Button></div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard