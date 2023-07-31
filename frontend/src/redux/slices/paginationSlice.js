import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    page: 1,
    pageSize: 20,
    pageCount: 0,
    total: 0,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
           setPage: (state, action)=>{
            state.page = action.payload;
           },
           setPageSize: (state, action)=> {
            state.pageSize = action.payload;
           },
           setPageCount: (state, action)=> {
            state.pageCount = action.payload;
           },
           setTotal: (state, action)=> {
            state.total = action.payload;
           },

    }
})



export const {setPage, setPageSize, setPageCount, setTotal} = paginationSlice.actions
export default paginationSlice.reducer