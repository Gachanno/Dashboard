import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'


interface tableFilters {
  filters: string[]
}


const initialState: tableFilters = {
  filters: [],
}

export const tableFiltersSlice = createSlice({
  name: 'tableFilters',
  initialState,
  reducers: {
    editFilters(state, action: PayloadAction<string[]>) {
      state.filters =  action.payload
    }
  }
})

export const { editFilters } = tableFiltersSlice.actions

export const selectCount = (state: RootState) => state.tableFilters.filters

export default tableFiltersSlice.reducer