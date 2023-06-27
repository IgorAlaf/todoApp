import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import todoSlice from './todoSlice'
const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    todoReducer: todoSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
