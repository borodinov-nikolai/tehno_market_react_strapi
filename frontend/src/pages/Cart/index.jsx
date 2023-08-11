import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import styles from './Cart.module.scss'
import Button from 'react-bootstrap/Button'
import {useSelector, useDispatch } from 'react-redux'
import { addCartItem, minusCartItem, removeCartItem} from '../../redux/slices/cartSlice'
import OrderModal from '../../components/cartPage/OrderModal'




const Cart = () => {
   const {title, cartWrapper, itemHolder, cartItem, counter, total, cartTitle, remove, counterHolder, sum, imgHolder, cartEmpty} = styles
   const {itemList, totalPrice} = useSelector((state)=> state.cart)
     const dispatch = useDispatch();
  const totalCount = itemList.length > 0 ? itemList.reduce((sum, item)=> sum + Number(item.count), 0) : 0
   

     
     
   

   



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

            {itemList.map(({id, name, imgURL, price}, index)=> {
              return ( <div key={id} className={cartItem}> 
                 <div className={imgHolder}>
                    <img src={imgURL} alt="" />
                    </div>
                 <div className={cartTitle} >{name}</div>
                 <p>..............................................................................................................................
                 </p>
                 <div className={counterHolder}><i onClick={()=> dispatch(minusCartItem(id))} className="bi bi-dash-circle"></i> <div className={counter} > {itemList.length > 0 && itemList[index].count}</div> <i onClick={()=>dispatch(addCartItem({id}))} className="bi bi-plus-circle"></i></div>
                 <div > {price} p</div>
                 <div className={remove} onClick={()=>dispatch(removeCartItem(id))} > <i className="bi bi-x-lg"></i></div>
            </div>)
            })}   
          
          
           </div>

                  <div className={total}>
                    <div className={sum} > {totalCount} товаров на сумму: {totalPrice} р </div>
                     <OrderModal/>
                  </div>


       </div>
   </Container>
  )
}

export default Cart