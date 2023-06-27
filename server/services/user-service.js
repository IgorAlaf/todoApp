import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import mailService from './mail-service.js'
import { UserDto } from '../dtos/user-dto.js'
import tokenService from './token-service.js'
import { ApiError } from '../exceptions/api-error.js'
import pool from '../db/db.config.js'
const { generateTokens, saveToken, validateAccessToken, validateRefreshToken } =
  tokenService
class UserService {
  async registration(email, password) {
    const candidate = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    if (candidate.rows[0]) {
      throw ApiError.badRequest(
        `Candidate is already exists with the same email ${email}`
      )
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = v4()
    const user = await pool.query(
      'INSERT INTO users(email,hashed_password,activationLink) VALUES($1,$2,$3) RETURNING *',
      [email, hashPassword, activationLink]
    )
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )
    const userDto = new UserDto(user.rows[0]) // id email , isActivated
    const tokens = generateTokens({ ...userDto })
    await saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async activate(activationLink) {
    const user = await pool.query(
      'SELECT * FROM users WHERE activationLink=$1',
      [activationLink]
    )
    if (!user.rows[0]) {
      throw new ApiError.badRequest("Don't correct activate link")
    }
    await pool.query(
      'UPDATE users SET isActivated = $1 WHERE activationLink = $2',
      [true, activationLink]
    )
  }
  async login(email, password) {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    if (!user.rows[0]) {
      throw ApiError.badRequest('User with the same email not founded')
    }
    const isPassEquals = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    )
    if (!isPassEquals) {
      throw ApiError.badRequest('Wrong password')
    }
    const userDto = new UserDto(user.rows[0])
    const tokens = generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError()
    }
    const userData = validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError()
    }
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      userData.id
    ])
    const userDto = new UserDto(user.rows[0])
    const tokens = generateTokens({ ...userDto })
    await saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
  async passwordRecovery(to) {
    const code = Math.floor(Math.random() * 10000)
    await mailService.sendCodeToChangePass(to, code)
    return code
  }
  async changePassword(email, newPassword) {
    const candidate = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    if (!candidate.rows[0]) {
      throw ApiError.unauthorizedError()
    }
    const hashPassword = await bcrypt.hash(newPassword, 3)
    await pool.query('UPDATE users SET hashed_password = $1 WHERE email = $2', [
      hashPassword,
      email
    ])
    return true
  }
}

export default new UserService()
