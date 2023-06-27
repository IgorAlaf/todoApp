import React, { FC, useEffect, useState } from 'react'
import ListItem from './ListItem'
import AddItem from './AddItem'
import HeaderTodo from './HeaderTodo'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { ITodo } from '../../types/todo.interface'
import { fetchCheckAuth, fetchGetTodos } from '../../store/AsyncFunctions'
import { useAppSelector } from '../../hooks/useAppSelector'
import Paginate from '../paginate/Paginate'

const TodoList: FC = () => {
  const dispatch = useAppDispatch()
  const { todos } = useAppSelector(state => state.todoReducer)
  const [tasksInPage] = useState(Math.min(5))
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    async function getTodos() {
      await dispatch(fetchGetTodos())
    }
    getTodos()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const lastTodo = currentPage * tasksInPage
  const firstTodo = lastTodo - tasksInPage
  return (
    <div
      className='flex flex-col items-center borer-solid border-8  border-gray-200 '
      style={{ width: '700px', minHeight: '432px' }}
    >
      <HeaderTodo capacity={todos.length} />
      <AddItem />
      <ul style={{ width: '100%', flex: '1 1 auto' }} className='bg-gray-300'>
        {todos.slice(firstTodo, lastTodo).map(task => (
          <ListItem key={task.todo_id} todo={task} />
        ))}
      </ul>
      <Paginate
        tasksInPage={tasksInPage}
        tasksLength={todos.length}
        paginate={paginate}
      />
    </div>
  )
}

export default TodoList
