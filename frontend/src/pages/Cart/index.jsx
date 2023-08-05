import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import styles from './Cart.module.scss'
import Button from 'react-bootstrap/Button'

const Cart = () => {
   const {title, cartWrapper, itemHolder, cartItem, counter, total, price, remove, counterHolder, sum} = styles

  return (
   <Container>

       <div className={title}> Корзина</div>

       <div className={cartWrapper}>
           <div className={itemHolder} >
            <div className={cartItem}> 
                 <img src="http://localhost:1337/uploads/Poco_C_40_987263d841.jpg" alt="" />
                 <h2>Poco C-40</h2>
                 <p>..............................................................................................................................
                 </p>
                 <div className={counterHolder}><i class="bi bi-dash-circle"></i> <div className={counter} > 1</div> <i class="bi bi-plus-circle"></i></div>
                 <div className={price} > 14000 p</div>
                 <div className={remove} > <i class="bi bi-x-lg"></i></div>
            </div>
            <div className={cartItem}> 
                 <img src="http://localhost:1337/uploads/Poco_C_40_987263d841.jpg" alt="" />
                 <h2>Poco C-40</h2>
                 <p>..............................................................................................................................
                 </p>
                 <div className={counterHolder}><i class="bi bi-dash-circle"></i> <div className={counter} > 1</div> <i class="bi bi-plus-circle"></i></div>
                 <div className={price} > 14000 p</div>
                 <div className={remove} > <i class="bi bi-x-lg"></i></div>
            </div>
           </div>

                  <div className={total}>
                    <div className={sum} > 2 товара на сумму: 28000 р </div>
                     <Button variant ='dark' > Оформить заказ </Button>
                  </div>


       </div>
   </Container>
  )
}

export default Cart