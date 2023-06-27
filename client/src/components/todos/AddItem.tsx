import React, { FormEventHandler, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchAddTodo } from '../../store/AsyncFunctions'

const AddItem = () => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')
  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (title) {
      await dispatch(fetchAddTodo(title))
      setTitle('')
    } else {
      setError('Todo is empty')
    }
  }
  return (
    <form
      className='bg-[#F2F2F2] text-white flex items-center py-5 px-4 relative'
      style={{ width: '100%' }}
      onSubmit={onSubmit}
    >
      <input
        type='text'
        value={title}
        onChange={e => {
          setTitle(e.target.value)
          setError('')
        }}
        className='py-1 px-5 outline-none border border-solid shadow-sm text-black'
        style={{ flex: '1 1 100%' }}
      />
      <button
        className='bg-[#007BFF]  px-5 py-1 rounded-sm '
        style={{ flex: '1 1 20%' }}
        type='submit'
      >
        new todo
      </button>
      {error && (
        <div className='text-red-500 text-sm font-bold absolute left-4 top-0 '>
          {error}
        </div>
      )}
    </form>
  )
}

export default AddItem
