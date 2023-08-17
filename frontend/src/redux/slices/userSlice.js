import {createSlice} from '@reduxjs/toolkit'







const initialState = {
    userId: '',
    cartId: null,
    userName: '',
    isAuth: false,

}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setUser: (state, action) => {
            state.userName = action.payload.username;
            state.userId = action.payload.id;
        },
        setCartId: (state, action) => {
            state.cartId = action.payload
        }
    }
})
 

export const {setIsAuth, setUser, setCartId} = userSlice.actions

export default userSlice.reducer