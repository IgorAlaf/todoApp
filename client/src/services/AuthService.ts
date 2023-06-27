import $api from '../http'
import { API_URL } from '../http'
import { AuthResponse } from '../models/response/AuthResponse'
import axios, { AxiosResponse } from 'axios'
export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.post<AuthResponse>('/login', {
      email,
      password
    })
    localStorage.setItem('user_id', response.data.user.id)
    return response
  }
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.post<AuthResponse>('/registration', {
      email,
      password
    })
    localStorage.setItem('user_id', response.data.user.id)
    return response
  }
  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
  static async recoveryPass(email: string): Promise<AxiosResponse<number>> {
    const response = await axios.post<number>(`${API_URL}/recoveryPass`, {
      email
    })
    return response
  }
  static async changePassword(
    email: string,
    password: string
  ): Promise<AxiosResponse<string>> {
    const response = await axios.post<string>(`${API_URL}/changePassword`, {
      email,
      password
    })
    return response
  }
}
