import { API_URL } from './../http/index'
import axios from 'axios'
import AuthService from '../services/AuthService'
import { AppDispatch } from './store'
import userSlice from './userSlice'
import { AuthResponse } from '../models/response/AuthResponse'
import todoSlice from './todoSlice'
import TodoService from '../services/TodoService'

export const fetchLogin =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<string> => {
    try {
      dispatch(userSlice.actions.loginFetch())
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(userSlice.actions.loginFetchSuccess(response.data.user))
      return ''
    } catch (err) {
      let message: string = 'Error!!!'
      if (err instanceof Error) {
        message = err.message
      }
      dispatch(userSlice.actions.loginFetchError(message))
      return 'Email or password is not valid'
    }
  }

export const fetchRegistration =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<string> => {
    try {
      dispatch(userSlice.actions.regFetch)
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(userSlice.actions.loginFetchSuccess(response.data.user))
      return ''
    } catch (err) {
      let message: string = 'Error!!!'
      if (err instanceof Error) {
        message = err.message
      }
      dispatch(userSlice.actions.loginFetchError(message))
      return 'Candidate is already exists with the this email'
    }
  }

export const fetchLogout = () => async (dispath: AppDispatch) => {
  try {
    dispath(userSlice.actions.logoutFetch())
    await AuthService.logout()
    localStorage.removeItem('token')
    dispath(userSlice.actions.logoutFetchSuccess())
  } catch (err) {
    let message: string = 'Error!!!'
    if (err instanceof Error) {
      message = err.message
    }
    dispath(userSlice.actions.loginFetchError(message))
  }
}

export const fetchCheckAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.checkAuth())
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true
    })
    localStorage.setItem('token', response.data.accessToken)
    dispatch(userSlice.actions.checkAuthSuccess(response.data.user))
  } catch (err) {
    let message: string = 'Error!!!'
    if (err instanceof Error) {
      message = err.message
    }
    dispatch(userSlice.actions.checkAuthError(message))
  }
}

export const fetchAddTodo =
  (title: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(todoSlice.actions.processRequest())
      const response = await TodoService.add(title)
      dispatch(todoSlice.actions.addTodo({ ...response.data }))
      return true
    } catch (err) {
      let message = 'Error!!!'
      if (err instanceof Error) {
        message = err.message
      }
      dispatch(todoSlice.actions.errorExecute(message))
    }
  }
export const fetchRemoveTodo =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(todoSlice.actions.processRequest())
      const response = await TodoService.remove(id)
      dispatch(todoSlice.actions.removeTodo({ ...response.data }))
      return true
    } catch (err) {
      let message = 'Error!!!'
      if (err instanceof Error) {
        message = err.message
      }
      dispatch(todoSlice.actions.errorExecute(message))
    }
  }
export const fetchGetTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.processRequest())
    const response = await TodoService.get()
    dispatch(todoSlice.actions.getTodos(response.data))
    return true
  } catch (err) {
    let message = 'Error!!!'
    if (err instanceof Error) {
      message = err.message
    }
    dispatch(todoSlice.actions.errorExecute(message))
  }
}
export const fetchEditTodo =
  (id: number, newTask: { completed: boolean; title: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(todoSlice.actions.processRequest())
      const response = await TodoService.edit(id, newTask)
      dispatch(todoSlice.actions.editTodo({ ...response.data }))
      return true
    } catch (err) {
      let message = 'Error!!!'
      if (err instanceof Error) {
        message = err.message
      }
      dispatch(todoSlice.actions.errorExecute(message))
    }
  }
