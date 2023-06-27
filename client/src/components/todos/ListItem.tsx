import { useState } from 'react'
import Modal from './Modal'
import { ITodo } from '../../types/todo.interface'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import cn from 'classnames'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchEditTodo, fetchRemoveTodo } from '../../store/AsyncFunctions'
interface IProps {
  todo: ITodo
}

const ListItem = ({ todo }: IProps) => {
  const [showModal, setShowModal] = useState(false)
  const [check, setCheck] = useState<boolean>(false)
  const dispath = useAppDispatch()
  const handleCheck = async () => {
    setCheck(prev => !prev)
    const response = await dispath(
      fetchEditTodo(todo.todo_id, { title: todo.title, completed: check })
    )
  }
  const deleteItem = async () => {
    try {
      await dispath(fetchRemoveTodo(todo.todo_id))
      // if (response.status === 200) {
      //   getData()
      // }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <li
      className={cn(
        'flex text-black border-t-2 justify-between py-2 px-4 bg-[#F2F2F2]',
        { 'bg-gray-300': check }
      )}
      style={{ width: '100%' }}
    >
      <label className='flex gap-4 cursor-pointer items-center'>
        <input type='checkbox' checked={check} onChange={handleCheck} />
        <p className={cn({ 'line-through': check }, 'select-none')}>
          {todo.title}
        </p>
      </label>

      <div className='flex gap-3'>
        <button className='' onClick={() => setShowModal(true)}>
          <div className='bg-green-700 p-2 rounded-sm'>
            <AiTwotoneEdit color='white' />
          </div>
        </button>
        <button className='' onClick={deleteItem}>
          <div className='bg-red-700 p-2 rounded-sm'>
            <BsFillTrash3Fill color='white' />
          </div>
        </button>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} todo={todo} mode={'edit'} />
      )}
    </li>
  )
}

export default ListItem
