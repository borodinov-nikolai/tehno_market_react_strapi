import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    userId: '',
    userName: '',
    isAuth: false
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
    }
})

export const {setIsAuth, setUser} = userSlice.actions

export default userSlice.reducer