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
           const findItem = (state.itemList.find((item) => item.id === action.payload.id));
            if(findItem)
            {
                  findItem.count++;
            } else {
                state.itemList.push({...action.payload, count: 1});
            }

             state.totalPrice = state.itemList.reduce((sum, item)=> {return (item.price * item.count) + sum },0);
        },
        minusCartItem: (state, action) => {
           const findItem = (state.itemList.find((item) => item.id === action.payload));
           if(findItem.count <= 1) {
               state.itemList = (state.itemList.filter((item) => item.id !== action.payload));

            } else {
                findItem.count--;
            }
             state.totalPrice = state.itemList.reduce((sum, item)=> {return (item.price * item.count) + sum },0);
               
        },
        removeCartItem: (state, action)=> {
            state.itemList = (state.itemList.filter((item) => item.id !== action.payload));
            state.totalPrice = state.itemList.reduce((sum, item)=> {return (item.price * item.count) + sum },0);

        },
        setItemList: (state, action)=> {
            state.itemList = action.payload
        },
        setTotalPrice: (state, action)=> {
            state.totalPrice = action.payload
        }


    }
})



export const {addCartItem, minusCartItem, removeCartItem , setItemList, setTotalPrice} = cartSlice.actions

export default cartSlice.reducer