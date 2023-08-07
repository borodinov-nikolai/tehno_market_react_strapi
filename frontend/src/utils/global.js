


const global = {
    

     async checkAuth($api, dispatch, setIsAuth, setUser) {
        if(localStorage.getItem('token')){
         await $api.get('users/me')
          .then((res)=>dispatch(setUser(res.data)))
         return dispatch(setIsAuth(true))
        } 
          dispatch(setIsAuth(false))
      },


      saveCart(itemList, totalPrice) {
        const itemListString = JSON.stringify(itemList);
        localStorage.setItem('itemList', itemListString);
        localStorage.setItem('totalPrice', totalPrice);
   
        
        
      },

      loadCart(dispatch, setItemList, setTotalPrice) {
        const itemList = JSON.parse(localStorage.getItem('itemList'))
        dispatch(setItemList(itemList? itemList: []))
        dispatch(setTotalPrice(localStorage.getItem('totalPrice')))
    },




    

}



export const {checkAuth, loadCart, saveCart} = global