import { Router } from 'express'
import userContoller from '../controllers/user-contoller.js'
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/auth-middleware.js'
import todoController from '../controllers/todo-controller.js'
const router = new Router()
const {
  registration,
  login,
  logout,
  activate,
  refresh,
  passwordRecovery,
  changePassword
} = userContoller
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  registration
)
router.post('/login', login)
router.post('/logout', logout)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.get('/todos/:user_id', authMiddleware, todoController.getTodos)
router.post('/todos', authMiddleware, todoController.AddTodo)
router.put('/todos/:id', authMiddleware, todoController.changeTodo)
router.delete('/todos/:id', authMiddleware, todoController.removeTodo)
router.post('/recoveryPass', passwordRecovery)
router.post('/changePassword', changePassword)

export default router
