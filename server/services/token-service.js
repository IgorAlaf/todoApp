import jwt from 'jsonwebtoken'
import pool from '../db/db.config.js'
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    })
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const text = refreshToken
    const tokenData = await pool.query(
      'SELECT * FROM refreshToken WHERE user_id = $1',
      [userId]
    )
    if (tokenData.rows[0]) {
      const refreshToken = await pool.query(
        'UPDATE refreshToken SET refreshToken = $1 WHERE user_id = $2',
        [text, userId]
      )
      return refreshToken
    }
    const token = await pool.query(
      `INSERT INTO refreshToken(refreshToken,user_id) VALUES($1,$2)`,
      [refreshToken, userId]
    )

    return token.rows[0]
  }
  async removeToken(refreshToken) {
    const tokenData = await pool.query(
      'DELETE FROM refreshToken WHERE refreshToken = $1 RETURNING *',
      [refreshToken]
    )
    return tokenData.rows[0]
  }
  async findToken(refreshToken) {
    const tokenData = await pool.query(
      'SELECT * FROM refreshToken WHERE refreshToken = $1',
      [refreshToken]
    )
    return tokenData.rows[0]
  }
}

export default new TokenService()
