const { Router } = require('express')
const router = Router()
const Note = require('../models/note.model')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')

router.post(
  '/create',
  [
    check('headerText', 'Минимальная длина заголовка 1 символ').isLength({ min : 1 }),
    check('mainText', 'Минимальная длина текста 1 символ').isLength({ min : 1 })
  ],
  auth,
  async(req, res) => {
    try {
      
      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при заполнении'
        })
      }

      const note = new Note({
        headerText: req.body.headerText, 
        mainText: req.body.mainText, 
        owner: req.user.userId
      })
      
      await note.save()

      res.status(201).json({ note, message: 'Записка создана' })

    } catch (e) {

      res.status(500).json({ message: 'Ошибка при создании, попробуйте снова'})

    }
  }
)

router.get(
  '/',
  auth,
  async(req, res) => {
    try {

      const notes = await Note.find({ owner: req.user.userId })

      res.json(notes)

    } catch (e) {

      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })

    }
  }
)

router.get(
  '/:id',
  auth,
  async (req, res) =>{
    try {

      const notes = await Note.findById(req.params.id)

      res.json(notes)

    } catch (e) {

      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })

    }
  }
)

router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      await Note.deleteOne({_id: req.params.id})

      res.json({ message: 'Удаление прошло успешно'})

    } catch (e) {

      res.json({ message: 'Не удалось удалить, попробуйте снова'})

    }
  }
)

router.post(
  '/:id',
  auth,
  async (req, res) => {
    try {

      const updateNote = await Note.updateOne(
        {_id: req.params.id}, 
        { $set: {headerText: req.body.headerText, mainText: req.body.mainText }
      })

      res.json({updateNote,message: 'Вы успешно изменили записку'})

    } catch (e) {

      res.json({ message: 'Не удалось изменить, попробуйте снова'})

    }
  }
)

module.exports = router