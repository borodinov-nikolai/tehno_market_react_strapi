import {configureStore} from '@reduxjs/toolkit'
import user from './slices/userSlice'
import filters from './slices/filtersSlice'
import pagination from './slices/paginationSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        cart,
        user,
        filters,
        pagination
    }
})