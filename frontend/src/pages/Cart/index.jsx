import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import styles from './Cart.module.scss'
import Button from 'react-bootstrap/Button'
import {useSelector } from 'react-redux'




const Cart = () => {
   const {title, cartWrapper, itemHolder, cartItem, counter, total, cartTitle, remove, counterHolder, sum, imgHolder} = styles
 const {itemList, totalPrice} = useSelector((state)=> state.cart)

     
       
       const totalCount = itemList.length > 0 ? itemList.reduce((sum, item)=> sum + Number(item.count), 0) : 0;
     


React.useEffect(()=>{
     console.log(itemList);
     console.log(totalPrice)

}, itemList)
  

  return (
   <Container>

       <div className={title}> Корзина</div>

       <div className={cartWrapper}>
           <div className={itemHolder} >

            {itemList.map(({id, name, img, price})=> {
              return ( <div key={id} className={cartItem}> 
                 <div className={imgHolder}>
                    <img src={img} alt="" />
                    </div>
                 <div className={cartTitle} >{name}</div>
                 <p>..............................................................................................................................
                 </p>
                 <div className={counterHolder}><i class="bi bi-dash-circle"></i> <div className={counter} > 1</div> <i class="bi bi-plus-circle"></i></div>
                 <div className={price} > {price} p</div>
                 <div className={remove} > <i class="bi bi-x-lg"></i></div>
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