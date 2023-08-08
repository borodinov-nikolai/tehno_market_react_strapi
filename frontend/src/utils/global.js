


const global = {
    

     async checkAuth($api, dispatch, setIsAuth, setUser) {
       console.log('проверка авторизации')
      try {
         if(localStorage.getItem('token'))
         {
         await $api.get('users/me')
          .then((res)=>dispatch(setUser(res.data)))

         return dispatch(setIsAuth(true))
        } 

         dispatch(setIsAuth(false))

      } catch(e) {
        console.error(e.message)
      }
       
      },


      
   async checkCart($api, isAuth, cartId, userId, dispatch, setCartId){
      if (isAuth) {
         console.log('проверка корзины')
        try {
          await $api.get('users/me?populate[cart]=*')
            .then((res) => dispatch(setCartId(res.data.cart.id)))
        } catch (e) {
          console.error(e.message)
          dispatch(setCartId(false))
        }

        if (cartId === false) {
          try {
            await $api.post("carts/", {
              data: {
                users_permissions_user: userId
              }
            })
              .then(res => dispatch(setCartId(res.data.data.id)))
          } catch (e) {
            console.error(e.message)
          }
        }


      }
    },



      saveCartLocal(itemList, totalPrice) {
        console.log('сохранилось локально')
        const itemListString = JSON.stringify(itemList);
        localStorage.setItem('itemList', itemListString);
        localStorage.setItem('totalPrice', totalPrice);
   
        
        
      },


      async saveCartOnServer(isAuth, itemList, cartId, $api, totalPrice){
      
          
        if (isAuth && cartId) {
         console.log('сохранилось на сервер')
          try {
           await  $api.put(`carts/${cartId}`, {
              data: {
                itemList
  
              }
            })
  
          await $api.put(`carts/${cartId}`, {
              data: {
                totalPrice
  
              }
            })
  
          } catch (error) {
            console.error('ошибка', error.message)
          }
  
  
  
        }
      },


      
    async getCartFromServer(isAuth, cartId, $api, dispatch, setItemList, setTotalPrice ){
      if (isAuth && cartId) {
            console.log('загружаем корзину с сервера')
          try {
           const response = await $api.get(`users/me?populate[cart][populate]=*`)
           const {data} = response
                
               data.cart.itemList ? dispatch(setItemList(data.cart.itemList)) : dispatch(setItemList([]))
               data.cart.totalPrice ? dispatch(setTotalPrice(data.cart.totalPrice)) : dispatch(setTotalPrice(0))
            
       
         
          } catch (error) {
            console.error('ошибка', error.message)
          }
        
      }
    },


      loadCartLocal(dispatch, setItemList, setTotalPrice, itemList, cartId, isAuth ) {
        if ( isAuth) {
          console.log('загружаем корзину локально')
        const itemList = JSON.parse(localStorage.getItem('itemList'))
        dispatch(setItemList(itemList? itemList: []))
        dispatch(setTotalPrice(localStorage.getItem('totalPrice')))
    }

    },




    

}



export const {checkAuth, loadCartLocal, saveCartLocal, checkCart, getCartFromServer, saveCartOnServer} = global