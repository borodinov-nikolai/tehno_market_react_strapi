import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    totalPrice: 0,
    itemList: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action)=> {
           const findItem = (state.itemList.find((item) => item.id === action.payload.id))
            if(findItem)
            {
                  findItem.count++;
            } else {
                state.itemList.push({...action.payload, count: 1});
            }

             state.totalPrice = state.itemList.reduce((sum, item)=> {return (item.price * item.count) + sum },0);
        },
        removeCartItem: (state, action)=> {

        },

    }
})


export const {addCartItem} = cartSlice.actions

export default cartSlice.reducer