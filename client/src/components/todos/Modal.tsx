import { FC, useState, MouseEventHandler } from 'react'
import { ITodo } from '../../types/todo.interface'
import './modal.style.css'
import { AiOutlineClose } from 'react-icons/ai'
import cn from 'classnames'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchEditTodo } from '../../store/AsyncFunctions'
interface IProps {
  todo: ITodo
  setShowModal: Function
  mode: 'edit' | 'post'
}

const Modal: FC<IProps> = ({ todo, setShowModal, mode }) => {
  const [data, setData] = useState<string>(todo.title)
  const dispatch = useAppDispatch()
  const editData: MouseEventHandler<HTMLInputElement> = async e => {
    e.preventDefault()
    try {
      await dispatch(
        fetchEditTodo(todo.todo_id, { title: data, completed: todo.completed })
      )
      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3 className='text-lg '>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>
            <AiOutlineClose color='red' size='15' />
          </button>
        </div>

        <form className='mt-5'>
          <input
            className='outline-none border border-solid py-1 px-3'
            required
            maxLength={30}
            placeholder='Your task goes here'
            name='title'
            value={data}
            onChange={e => setData(e.target.value)}
          />
          <input
            className={cn(
              'mt-5 bg-[#007BFF] w-32 py-1 rounded-sm text-white cursor-pointer'
            )}
            type='submit'
            onClick={editData}
          />
        </form>
      </div>
    </div>
  )
}
export default Modal
