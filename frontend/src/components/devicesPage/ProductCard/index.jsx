import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './ProductCard.module.scss';
import {useDispatch} from 'react-redux';
import { addCartItem } from '../../../redux/slices/cartSlice';

const ProductCard = ({id, name, price, imgURL }) => {
   const dispatch = useDispatch();
     
     const toDescription = (event) => {


      if(!event.target.closest('button'))
      {

        window.location.assign(`http://localhost:3000/devices/${name}`)
      }
      
     }





  const [animation, setAnimation] = React.useState('')
  return (
   <div className={"col-xl-3 col-lg-4 col-sm-6 col-xs-12 " + styles.root} >
     
        <Card onClick={(event)=>toDescription(event)}  onMouseEnter={()=>{setAnimation("animate__animated animate__headShake")}} onMouseLeave={()=>setAnimation("")}  className={animation} data-item= 'item'>
          <Card.Body>
            <div className='d-flex justify-content-center' ><Card.Img variant="top" src={imgURL} style={{height:'220px', width: 'auto'}} /></div>
            <Card.Title className='mt-2' >{name}</Card.Title>
            <Card.Text >
              Цена: {price}p
            </Card.Text>
            <div className='d-flex justify-content-end'><Button onClick={()=>dispatch(addCartItem({id, name, price, imgURL}))} className={styles.button} variant="primary">В корзину</Button></div>
          </Card.Body>
        </Card>
     
   </div>
  )
}

export default ProductCard