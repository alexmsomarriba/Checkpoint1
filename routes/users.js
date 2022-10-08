const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/users', usersController.listUsers)

router.get('/users/:id', usersController.showUser)

router.post('/users', usersController.createUser)

router.put('/users/:id', usersController.updateUser)

router.delete('/users/:id', usersController.deleteUser)

module.exports = router