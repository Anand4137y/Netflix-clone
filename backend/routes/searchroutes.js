const express = require('express')
const router = express.Router()
const {searchPerson,searchMovie,searchTv,getSearchHistory,removeItemFromSearchHistory} = require('../controllers/search.controllers')

router.get('/person/:query',searchPerson)
router.get('/movie/:query',searchMovie)
router.get('/tv/:query',searchTv)

router.get('/history',getSearchHistory)
router.delete('/history/:id',removeItemFromSearchHistory)

module.exports = router