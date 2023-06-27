import React, { useState, useEffect, FormEventHandler } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import AuthService from '../../services/AuthService'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

const RecoveryPassword = () => {
  const { user } = useAppSelector(state => state.userReducer)
  const [point, setPoint] = useState<number>(1)
  const [code, setCode] = useState(1234)
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (point === 1) {
      setLoading(true)
      try {
        const access = await AuthService.recoveryPass(email)
        setLoading(false)
        setCode(access.data)
        setPoint(2)
      } catch (e) {
        setError('Incorrect email')
      }
    } else if (point === 2) {
      if (Number(value) !== code) {
        setError('Incorrect code')
      } else {
        setPoint(3)
        setValue('')
        setError('')
      }
    } else {
      console.log(email, value)
      const access = await AuthService.changePassword(email, value)
      if (access.data) {
        navigate('/auth/login')
      }
    }
  }
  const waitSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
  }

  return (
    <div
      className='flex justify-center items-center'
      style={{ minHeight: '100%' }}
    >
      <div
        className='text-white rounded-sm px-10 py-5 bg-slate-300 bg-opacity-20 flex flex-col'
        style={{ flex: '0 0 auto' }}
      >
        <h1>Forgot your password?</h1>
        <h2 className='mt-5 text-sm  text-gray-400'>
          {point === 1
            ? 'Enter your email'
            : point === 2
            ? 'Enter code from your email'
            : 'Enter new password '}
        </h2>
        <form onSubmit={isLoading ? waitSubmit : handleSubmit} className='mt-5'>
          {point === 1 ? (
            <input
              type='email'
              placeholder='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='hover:border-blue-500 animate transition-all duration-300 outline-none py-1 px-3 rounded-sm bg-transparent border border-solid border-blue-600'
            />
          ) : point === 2 ? (
            <input
              type='text'
              placeholder='code'
              value={value}
              onChange={e => setValue(e.target.value)}
              className='hover:border-blue-500 animate transition-all duration-300 outline-none py-1 px-3 rounded-sm bg-transparent border border-solid border-blue-600'
            />
          ) : (
            <input
              type='password'
              placeholder='new password'
              value={value}
              onChange={e => setValue(e.target.value)}
              className='hover:border-blue-500 animate transition-all duration-300 outline-none py-1 px-3 rounded-sm bg-transparent border border-solid border-blue-600'
            />
          )}

          <button
            className={classNames(
              'hover:bg-blue-800 animate transition-all duration-300 ml-3 bg-blue-600 py-1 px-3 rounded-sm',
              { 'cursor-not-allowed bg-gray-400 hover:bg-gray-400': isLoading }
            )}
            type='submit'
          >
            Send
          </button>
        </form>
        {error && (
          <div className='text-sm font-semibold text-red-500'>{error}</div>
        )}
        <div className='flex justify-center mt-5 px-4 text-sm text-blue-400'>
          <Link className='' to={'/auth/login'}>
            Sign in
          </Link>
          <span className='cursor-pointer'> &nbsp;| &nbsp; </span>
          <Link to={'/auth/'}> Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPassword
