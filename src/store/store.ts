import { configureStore } from '@reduxjs/toolkit'
import tableFiltersReducer from './tableFiltersSlice'

export const store = configureStore({
  reducer: {
    tableFilters: tableFiltersReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch