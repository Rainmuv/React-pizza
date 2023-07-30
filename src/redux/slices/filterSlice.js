import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoriesId: 0,
  pageCount: 1 ,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoriesId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
    setFilter(state, action) {
      state.categoriesId = Number(action.payload.categoriesId)
      state.pageCount = Number(action.payload.pageCount)
      state.sort = action.payload.sort
    }
  },
})

export const { setCategoryId, setSort, setPageCount, setFilter } = filterSlice.actions

export default filterSlice.reducer
