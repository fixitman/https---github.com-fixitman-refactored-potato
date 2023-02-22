const express = require('express')

const router = express.Router()
const {createList, getLists} = require('../controllers/listController')


router.post('/create', createList)
router.get('/', getLists)


module.exports = router