import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authorization from './components/auth/Authorization'
import LoginForm from './components/auth/LoginForm'
import Todos from './components/todos/Todos'
import RecoveryPassword from './components/auth/RecoveryPassword'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/Todos',
    element: <App />
  },
  {
    path: '/auth',
    element: <Authorization />
  },
  {
    path: '/auth/login',
    element: <LoginForm />
  },

  {
    path: '/auth/recoveryPass',
    element: <RecoveryPassword />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
