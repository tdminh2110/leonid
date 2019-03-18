
const express = require('express');

const clinicianController = require('../controllers/clinician');

const router = express.Router();

router.get('/', clinicianController.getAllPatients);
router.get('/list-patients', clinicianController.getAllPatients);

// /clinician/add-patient => GET
router.get('/add-patient', clinicianController.getAddPatient);

// /clinician/add-clinician => POST
router.post('/add-patient', clinicianController.postAddPatient);

router.get('/open-room', clinicianController.getOpenRoom);

module.exports = router;