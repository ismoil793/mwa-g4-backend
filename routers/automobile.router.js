const express = require("express");
const {
    getAllAutomobiles,
    addAutomobile,
    getAutoById,
    updateAutoById,
} = require('../controllers/automobile.controller')

const router = express.Router();

router.get('/', getAllAutomobiles) // GET /automobiles
router.post('/', addAutomobile)
router.get('/:auto_id', getAutoById)
router.put('/:auto_id', updateAutoById)
// router.delete('/:auto_id')
// router.post('/:auto_id/upload')
// router.get('/:auto_id/images')

module.exports = router;
