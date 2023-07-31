import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    typeId: null,
    brandId: null,
    search: '',
    sort: 'price:asc'
    
}


export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setTypeId: (state, action)=>{
            state.typeId = action.payload
        },
        setBrandId: (state, action)=>{
            state.brandId = action.payload
        },
        setSearch: (state, action)=>{
            state.search = action.payload
        },
        setSort: (state, action)=>{
            state.sort = action.payload
        },
    }
})


export const {setTypeId, setBrandId, setSearch, setSort} = filtersSlice.actions
export default filtersSlice.reducer