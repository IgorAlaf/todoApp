import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchRegistration } from '../../store/AsyncFunctions'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector } from '../../hooks/useAppSelector'
import classNames from 'classnames'
interface IAuth {
  email: string
  password: string
  confirmPass: string
}

const Authorization: FC = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>('')
  const { isAuth } = useAppSelector(state => state.userReducer)
  const [valid, setValid] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuth>({
    mode: 'onChange'
  })
  const onSubmit: SubmitHandler<IAuth> = async data => {
    if (data.password === data.confirmPass) {
      setLoading(true)
      const response = await dispatch(
        fetchRegistration(data.email, data.password)
      )
      setLoading(false)
      if (!response) {
        navigate(`/`)
      }
      setError(response)
      setValid(true)
    } else {
      setValid(false)
    }
  }
  const waitSubmit: SubmitHandler<IAuth> = async data => {
    setTimeout(() => {}, 1000)
  }
  return (
    <div
      className='flex items-center justify-center flex-col gap-5'
      style={{ height: '100%' }}
    >
      <form
        onSubmit={handleSubmit(isLoading ? waitSubmit : onSubmit)}
        className='rounded-xl  bg-gray-300 bg-opacity-10 text-white shadow-xl flex flex-col justify-center  px-20 py-10 gap-y-5 '
        style={{ maxWidth: '399px' }}
      >
        <div>
          <h1 className='text-xl mb-2'>Sign up</h1>
          <h3 className='text-xs text-gray-400 mt-2'>
            login to manage your account
          </h3>
        </div>
        <div className='flex flex-col gap-3 mt-5'>
          <input
            type='email'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50 outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent'
            // onChange={e => setEmail(e.target.value)}
            placeholder='email'
            {...register('email', {
              required: 'email is required field',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'please inter valid email'
              }
            })}
          />
          {errors.email?.type === 'required' && (
            <div className='text-red-500 text-sm'>{errors.email?.message}</div>
          )}
          {errors.email?.type === 'pattern' && (
            <div className='text-red-500 text-sm'>{errors.email?.message}</div>
          )}

          <input
            id='pass'
            type='password'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50 outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent'
            placeholder='password'
            {...register('password', {
              required: 'password is required field',
              maxLength: 20,
              minLength: 6
            })}
          />
          {errors.password?.type === 'required' && (
            <div className='text-red-500 text-sm'>
              {errors.password?.message}
            </div>
          )}
          {errors.password?.type === 'minLength' && (
            <div className='text-red-500 text-sm text-bold'>
              password can't be less than 6 symbols
            </div>
          )}
          <input
            id='pass-confirm'
            type='password'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50  outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent'
            placeholder='confirm pass'
            {...register('confirmPass', {
              required: 'confirm pass is required field',
              maxLength: 20,
              minLength: 6
            })}
          />
          {errors.confirmPass?.type === 'required' && (
            <div className='text-red-500 text-sm text-bold'>
              {errors.confirmPass?.message}
            </div>
          )}
          {errors.confirmPass?.type === 'minLength' && (
            <div className='text-red-500 text-sm text-bold'>
              password can't be less than 6 symbols
            </div>
          )}
          {!valid && (
            <div className='text-teal-500 text-sm text-bold'>
              You enter different passwords!!!
            </div>
          )}
        </div>
        {error && (
          <div className='text-red-400 text-sm- text-bold'>{error}</div>
        )}

        {/* <button
            className='animate duration-200 py-1 w-32 rounded-md  hover:bg-blue-600 text-white bg-blue-300 shadow-xl'
            onClick={() => dispatch(fetchLogin(email, password))}
          >
            Login
          </button> */}
        <button
          type='submit'
          style={{ width: '100%' }}
          className={classNames(
            ' animate duration-300 py-[6px] w-32 rounded-md hover:bg-blue-500 text-white bg-[#026EF0] shadow-xl text-sm mt-8',
            { 'cursor-not-allowed': isLoading }
          )}
        >
          Sign up
        </button>
      </form>
      <div className='text-white text-center text-sm flex flex-col gap-y-2'>
        <p>
          <span className='mr-1 text-gray-500'>Have you an account?</span>
          <Link to={'/auth/login'} className='text-[#3B82F6]'>
            Sign in
          </Link>{' '}
        </p>
        <Link to={'/auth/recoveryPass'} className='text-[#3B82F6]'>
          Forgot password?
        </Link>
      </div>
    </div>
  )
}

export default Authorization
