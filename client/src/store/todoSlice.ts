import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITodo } from '../types/todo.interface'

interface IState {
  todos: ITodo[]
  isLoading: boolean
  error: string
}

const initialState: IState = {
  todos: [] as ITodo[],
  isLoading: false,
  error: ''
}

const todoSlice = createSlice({
  name: 'toodSlice',
  initialState,
  reducers: {
    processRequest(state) {
      state.isLoading = true
    },
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload)
      state.isLoading = false
    },
    removeTodo(state, action: PayloadAction<ITodo>) {
      state.todos = state.todos.filter(
        todo => todo.todo_id !== action.payload.todo_id
      )

      state.isLoading = false
    },
    getTodos(state, action: PayloadAction<ITodo[]>) {
      if (action.payload) {
        state.todos = action.payload
      }
      state.isLoading = false
    },
    editTodo(state, action: PayloadAction<ITodo>) {
      let todo = state.todos.find(
        item => item.todo_id === action.payload.todo_id
      )
      if (todo) {
        todo.completed = action.payload.completed
        todo.title = action.payload.title
      }
      state.isLoading = false
    },
    errorExecute(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default todoSlice
