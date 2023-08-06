import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import styles from './Cart.module.scss'
import Button from 'react-bootstrap/Button'
import {useSelector, useDispatch } from 'react-redux'
import { addCartItem, minusCartItem, removeCartItem, setTotalPrice } from '../../redux/slices/cartSlice'




const Cart = () => {
   const {title, cartWrapper, itemHolder, cartItem, counter, total, cartTitle, remove, counterHolder, sum, imgHolder, cartEmpty} = styles
   const {itemList, totalPrice} = useSelector((state)=> state.cart)
   const [totalCount, setTotalCount] = React.useState(0);
     const dispatch = useDispatch();
       
   

     
     
   

   
     React.useEffect(()=> {

      setTotalCount(itemList.length > 0 ? itemList.reduce((sum, item)=> sum + Number(item.count), 0) : 0);
    }, [itemList])

  



if(itemList.length < 1) {
  return (

     <h1 className={cartEmpty} >Корзина пуста</h1>

  )
}




  return (
   <Container>

       <div className={title}> Корзина</div>

       <div className={cartWrapper}>
           <div className={itemHolder} >

            {itemList.map(({id, name, img, price}, index)=> {
              return ( <div key={id} className={cartItem}> 
                 <div className={imgHolder}>
                    <img src={img} alt="" />
                    </div>
                 <div className={cartTitle} >{name}</div>
                 <p>..............................................................................................................................
                 </p>
                 <div className={counterHolder}><i onClick={()=> dispatch(minusCartItem(id))} className="bi bi-dash-circle"></i> <div className={counter} > {itemList.length>1 && itemList[index].count}</div> <i onClick={()=>dispatch(addCartItem({id}))} className="bi bi-plus-circle"></i></div>
                 <div > {price} p</div>
                 <div className={remove} onClick={()=>dispatch(removeCartItem(id))} > <i className="bi bi-x-lg"></i></div>
            </div>)
            })}   
          
          
           </div>

                  <div className={total}>
                    <div className={sum} > {totalCount} товаров на сумму: {totalPrice} р </div>
                     <Button variant ='dark' > Оформить заказ </Button>
                  </div>


       </div>
   </Container>
  )
}

export default Cart