const express = require('express')
const {
    getAllAutomobiles,
    addAutomobile,
} = require('../controllers/automobile.controller')

const router = express.Router()

router.get('/', getAllAutomobiles) // GET /automobiles
router.post('/', addAutomobile)
// router.get('/:auto_id')
// router.put('/:auto_id')
// router.delete('/:auto_id')
// router.post('/:auto_id/upload')
// router.get('/:auto_id/images')

module.exports = router