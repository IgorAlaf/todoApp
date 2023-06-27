import { AxiosResponse } from 'axios'
import { TodoResponse } from '../models/response/TodoResponse'
import $api from '../http'

export default class TodoService {
  static async add(title: string): Promise<AxiosResponse<TodoResponse>> {
    const user_id = localStorage.getItem('user_id')
    return $api.post<TodoResponse>('/todos', { title, user_id })
  }
  static async get(): Promise<AxiosResponse<TodoResponse[]>> {
    const user_id = localStorage.getItem('user_id')
    return $api.get<TodoResponse[]>(`/todos/${user_id}`)
  }
  static async remove(id: number): Promise<AxiosResponse<TodoResponse>> {
    const user_id = localStorage.getItem('user_id')
    return $api.delete<TodoResponse>(`/todos/${id}?user_id=${user_id}`)
  }
  static async edit(
    id: number,
    newTask: { title: string; completed: boolean }
  ): Promise<AxiosResponse<TodoResponse>> {
    const user_id = localStorage.getItem('user_id')
    return $api.put<TodoResponse>(`/todos/${id}`, { ...newTask, user_id })
  }
}
