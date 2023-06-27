import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../models/IUser'

interface IState {
  user: IUser
  isAuth: boolean
  isLoading: boolean
  errors: string
}

const initialState: IState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
  errors: ''
}

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    loginFetch(state) {
      state.isLoading = true
    },
    loginFetchSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    loginFetchError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.errors = action.payload
    },
    regFetch(state) {
      state.isLoading = true
    },
    regFetchSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    regFetchError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.errors = action.payload
    },
    logoutFetch(state) {
      state.isLoading = true
    },
    logoutFetchSuccess(state) {
      state.isLoading = false
      state.isAuth = false
      state.user = {} as IUser
    },
    logoutFetchError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.errors = action.payload
    },
    checkAuth(state) {
      state.isLoading = true
    },
    checkAuthSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    checkAuthError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.errors = action.payload
    }
  }
})

export default userSlice
