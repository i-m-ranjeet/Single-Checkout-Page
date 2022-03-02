import { configureStore } from '@reduxjs/toolkit'
import checkoutSlice from '../reducers/Reducers'

export const store = configureStore({
  reducer: {checkout:checkoutSlice},
})