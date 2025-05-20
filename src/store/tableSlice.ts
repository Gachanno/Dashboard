import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { TFilter, TFilterAction, TSortBy, TTable } from './types/type'

const initialState: TTable = {
  page: 1,
  pages: 1,
  limit: 10,
  sort: {
    sortBy: 'id',
    order: 'asc'
  },
  filter: {}
}
export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setLimit(state, action:PayloadAction<number>) {
      const limit = action.payload
      state.limit = limit
      state.page = 1
    },
    setPage(state, action:PayloadAction<number>){
      const page = action.payload

        state.page = page

    },
    setPages(state, action:PayloadAction<number>){
      const pages = action.payload

        state.pages = pages
    },
    setSort(state, action:PayloadAction<TSortBy>) {
        const { sort } = state
        const sortBy = action.payload;

        if(sortBy == sort.sortBy){
          state.sort = {
            ...sort,
            order: sort.order === 'asc' ? 'desc' : 'asc'
            }
        }
        else{
          state.sort = {
            sortBy,
            order: 'asc'
            }
        }
    },
    defaultSort (state) {
      state.sort ={
        sortBy: 'id',
        order: 'asc'
      }
    },
    setFilter(state, action:PayloadAction<TFilterAction>) {
      if(!!action.payload.min) state.filter.min = action.payload.min
      if(!!action.payload.max) state.filter.max = action.payload.max
    },
    clearFilter(state) {
      state.filter = {}
    }
  }
})

export const { setLimit, setPage, setPages, setSort, defaultSort, setFilter, clearFilter } = tableSlice.actions

export const selectCount = (state: RootState) => state.table

export default tableSlice.reducer