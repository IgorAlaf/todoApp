import React, { useState, useEffect, FC } from 'react'
import TodoList from './TodoList'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchCheckAuth, fetchLogout } from '../../store/AsyncFunctions'
import { IUser } from '../../models/IUser'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'
import AddItem from './AddItem'
import cn from 'classnames'
const Todos: FC<{ isAuth: boolean }> = ({ isAuth }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.userReducer)
  if (!isAuth) navigate('/auth')

  return (
    <div>
      <header
        className='bg-[#3C4043] flex items-center justify-between'
        style={{ minHeight: '50px' }}
      >
        <div className='ml-5 text-lg text-white'>
          <h3 className=''>{user.email}</h3>
          <h4
            className={cn(
              'text-sm',
              { 'text-green-500': user.isActivated },
              { 'text-red-500': !user.isActivated }
            )}
          >
            {user.isActivated ? 'verifed' : 'not verifed'}
          </h4>
        </div>
        <button
          className=' text-white bg-[#007BFF] py-2 px-5 mr-2 rounded-sm'
          onClick={() => dispatch(fetchLogout())}
        >
          Log out
        </button>
      </header>
      <div
        className='flex items-center justify-center'
        style={{ marginTop: '150px' }}
      >
        <TodoList />
      </div>
    </div>
  )
}

export default Todos
