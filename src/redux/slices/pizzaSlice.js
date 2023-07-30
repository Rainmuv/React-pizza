import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({order, sortBy, category, search, pageCount}, thunkAPI) => {

    const { data } = await axios.get(`https://6467fd09e99f0ba0a81c0007.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    return  data
  }

  
)

const initialState = {
  pizItems: [],
  status: 'loading'
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizItems = action.payload
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.pizItems = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'succes';
      state.pizItems = action.payload
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.pizItems = [];
    }
  }
})

export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
