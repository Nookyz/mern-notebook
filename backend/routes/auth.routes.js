const {Router} = require('express')
const router = Router()
const User = require('../models/user.model')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')


// /auth/register
router.post(
  '/register',
  [ 
    check('userName', 'Минимальная длина имени 3 символов').isLength({ min : 3 }),
    check('email', 'Некорректный адрес e-mail').isEmail(),
    check('password', 'Минимальная длина пароля 7 символов').isLength({ min: 7 }),
  ],
  async(req, res) => {
    try {
      
      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }

      const {email, password, userName} = req.body

      const candidateEmail = await User.findOne({ email })
      const candidateName = await User.findOne({ userName })

      if(candidateEmail){
        return res.status(400).json({ message: 'Такой e-mail уже занят'})
      }
      if(candidateName){
        return res.status(400).json({ message: 'Такое имя уже занято'})
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({email, password: hashedPassword, userName})
      
      await user.save()

      res.status(201).json({ message: 'Пользователь создан'})

    } catch (e) {
      res.status(500).json({ message: 'Ошибка при регистрации, попробуйте снова'})
    }
  }
)

// /auth/login
router.post(
  '/login',
  [
    check('email', 'Введите e-mail').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()                 
  ],
  async(req, res) => {
    try {

      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Неправильный пароль или e-mail при входе'
        })
      }

      const {email, password, name} = req.body

      const user = await User.findOne({ email })

      if(!user){
        return res.status(400).json({ message: 'Неправильный e-mail'}) // Пользователь не найден Неправильный пароль или e-mail
      }

      const pass = await bcrypt.compare(password, user.password)

      if(!pass){
        return res.status(400).json({ message: 'Неправильный пароль '}) // Неправильный пароль
      }

      const token = jwt.sign(
        { userId: user.id, userName: user.userName },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id, userName: user.userName  })

    } catch (e) {

      res.status(500).json({ message: 'Ошибка при регистрации, попробуйте снова'})
      
    }
  }
)

module.exports = router