
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getAllClinicians);
router.get('/list-clinicians', adminController.getAllClinicians);

// /admin/add-clinician => GET
router.get('/add-clinician', adminController.getAddClinician);

// /admin/add-clinician => POST
router.post('/add-clinician', adminController.postAddClinician);

module.exports = router;