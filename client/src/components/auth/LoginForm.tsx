import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchLogin } from '../../store/AsyncFunctions'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector'
interface ILogin {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const { isAuth } = useAppSelector(state => state.userReducer)
  const [error, setError] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>({
    mode: 'onChange'
  })
  const onSubmit: SubmitHandler<ILogin> = async data => {
    setLoading(true)
    const response = await dispatch(fetchLogin(data.email, data.password))
    setLoading(false)
    if (response) {
      setError(response)
    }
    if (!response) {
      navigate(`/`)
    }
  }
  const waitSubmit: SubmitHandler<ILogin> = async data => {
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
          <h1 className='text-xl mb-5'>Sign in</h1>
          <h3 className='text-xs text-gray-400 mt-2'>
            login to manage your account
          </h3>
        </div>
        <div className='flex flex-col gap-3'>
          <input
            type='email'
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50 rounded-md  outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent'
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
            className='hover:border-blue-500 focus:border-blue-500 animate transition-all duration-300  border-solid border border-gray-400 border-opacity-50 rounded-md  outline-none shadow-md bg-transparent py-[5px] px-7 rounded-sm placeholder:bg-transparent'
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
              Password can not be less than 6 symbols
            </div>
          )}
        </div>
        {error && (
          <div className='text-red-400 text-sm- text-bold'>{error}</div>
        )}
        <button
          type='submit'
          style={{ width: '100%' }}
          className='mt-8 animate duration-300 py-[6px] w-32 rounded-md hover:bg-blue-500 text-white bg-[#026EF0] shadow-xl text-sm'
        >
          Sign in
        </button>
      </form>
      <div className='text-white text-center text-sm flex flex-col gap-y-2'>
        <p>
          <span className='mr-1 text-gray-500'>Don't have an account?</span>
          <Link to={'/auth'} className='text-[#3B82F6]'>
            Sign up
          </Link>{' '}
        </p>
        <Link to={'/auth/recoveryPass'} className='text-[#3B82F6]'>
          Forgot password?
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
