const express = require('express');

const multer  = require('multer') //use multer to upload blob data
const upload = multer();

const patientController = require('../controllers/patient');

const router = express.Router();

const GAME1_NUMBER_OF_IMAGES = 5;

router.post('/upload-multifiles', upload.array("videos[]", GAME1_NUMBER_OF_IMAGES + 1), patientController.postUploadMultiFiles);

router.post('/upload-singlefile', upload.single("video"), patientController.postUploadSingleFile);

module.exports = router;