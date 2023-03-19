const path = require("path");
const express = require("express");
const multer = require("multer");
const {
  getAllAutomobiles,
  addAutomobile,
  getAutoById,
  getMyAutomobiles,
  updateAutoById,
    deleteAutoById,
    uploadImage,
} = require("../controllers/automobile.controller");
const offersRouter = require("./offers.router");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'))
    },
    fileFilter: (req, file, cb) => {
        if (file.mimeType !== 'image/jpeg') {
            return cb(new Error('Wrong file type'))
        }
        cb(null, true)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`)
    }
})

const upload = multer({storage, limits: {fileSize: 5 * 1024 * 1024}})

router.get('/', getAllAutomobiles) // GET /automobiles
router.post('/', addAutomobile)
router.get("/myAutomobiles/:user_id", getMyAutomobiles);
router.get('/:auto_id', getAutoById)
router.put('/:auto_id', updateAutoById)
router.delete('/:auto_id', deleteAutoById)
router.post('/:auto_id/upload', upload.array('picture', 4), uploadImage)

router.use("/:auto_id/offers/", offersRouter);
module.exports = router;
