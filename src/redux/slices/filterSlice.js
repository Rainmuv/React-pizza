import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    pageCount: 1 ,
    sortProperty: 'raiting',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    }
  },
})



export const { setCategoryId, setSort, setPageCount } = filterSlice.actions

export default filterSlice.reducer
