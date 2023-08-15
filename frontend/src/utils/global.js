


const global = {
    

     async checkAuth($api, dispatch, setIsAuth, setUser) {
      try {
         if(localStorage.getItem('token'))
         {
         await $api.get('users/me')
          .then((res)=>dispatch(setUser(res.data)))

         return dispatch(setIsAuth(true));
        } 

        
      } catch(e) {
         console.error('ошибка', e.message)
      }
       
      },


      
   async checkCart($api, isAuth, cartId, userId, dispatch, setCartId){
      if (isAuth) {
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



    async getCartFromServer(cartId, $api, dispatch, setItemList, setTotalPrice, setCartLoad){
      if (cartId) {
          try {
           await $api.get(`/users/me?populate[cart][populate]=*`)
           .then((response =>  {
             const {data} = response
                  
                 data.cart.itemList ? dispatch(setItemList(data.cart.itemList)) : dispatch(setItemList([]));
                 data.cart.totalPrice ? dispatch(setTotalPrice(data.cart.totalPrice)) : dispatch(setTotalPrice(0));
                 setCartLoad(true);

           }))
            
          } catch (error) {
            console.error('ошибка', error.message)
          }
        
      }
    },




      loadCartLocal( dispatch, setItemList, setTotalPrice, cartId ) {
        if (!cartId) {
        const itemList = JSON.parse(localStorage.getItem('itemList'))
        dispatch(setItemList(itemList? itemList: []))
        dispatch(setTotalPrice(localStorage.getItem('totalPrice')))
    }

    },





      async saveCartOnServer(itemList, cartId, $api, totalPrice, cartLoad){
      

        if (cartLoad) {
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



    saveCartLocal(itemList, totalPrice) {
      
        const itemListString = JSON.stringify(itemList);
        localStorage.setItem('itemList', itemListString);
        localStorage.setItem('totalPrice', totalPrice);

      
 
      },





    

}



export const {checkAuth, loadCartLocal, saveCartLocal, checkCart, getCartFromServer, saveCartOnServer} = global