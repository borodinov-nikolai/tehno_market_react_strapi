import {configureStore} from '@reduxjs/toolkit'
import user from './slices/userSlice'
import filters from './slices/filtersSlice'
import pagination from './slices/paginationSlice'

export const store = configureStore({
    reducer: {
        user,
        filters,
        pagination
    }
})