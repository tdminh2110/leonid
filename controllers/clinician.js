const User = require('../models/user');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');

const session = require('./common/session');

exports.getAddPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {      
        res.render('clinician/add-patient', {        
            pageTitle: 'Add a Patient',
            path: '/clinician/add-patient'
        });
    }  
    else
        res.redirect('/'); 
  };

exports.postAddPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        const name = req.body.name;
        const familyName = req.body.family_name;
        let birthday = req.body.birthday;
        const address = req.body.address;
        const phone = req.body.phone;      
        const email = req.body.email;
        const password = req.body.password;
        const re_password = req.body.re_password;
        const contactPersonName = req.body.cp_name;
        const contactPersonFamilyName = req.body.cp_family_name;
        const contactPersonAddress = req.body.cp_address;
        const contactPersonPhone = req.body.cp_phone;
        const contactPersonEmail = req.body.cp_email;
        
        let arrayBirthday = birthday.split("/");
        birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];
     
        if (password === re_password) {
            Clinician.findUserIDByemail(req.session.email)        
            .then(([clinicians]) => {
                if (clinicians.length == 1) {
                    const user = new User(null, name, familyName, email, password, 3);
                    user
                    .insert()
                    .then((results) => {                
                        const patient = new Patient(results[0].insertId, clinicians[0].IDClinician, birthday, address, phone, contactPersonName, contactPersonFamilyName,
                                                contactPersonEmail, contactPersonAddress, contactPersonPhone);                                                
                        patient
                        .insert()
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));                    
                    })        
                    .catch(err => console.log(err));
                } else                    
                    console.log("Not OK");
            })    
            .catch(err => console.log(err));
        } else
            res.redirect('/clinician/add-patient');  
    } else
        res.redirect('/');
};

exports.getAllPatients = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {   
                Patient.selectAll(clinicians[0].IDClinician)
                .then(([patients, fieldData]) => {
                    res.render('clinician/list-patients', {
                        patis: patients,
                        pageTitle: 'List of Patients',
                        path: '/clinician/list-patients'
                    });
                });                
            }   
            else
                console.log("Not OK");
        })
        .catch(err => console.log(err));
    }
    else
        res.redirect('/');
};

exports.getOpenRoom = (req, res, next) => {
    if (session.checkSession(req, 2)) {      
        res.render('clinician/open-room', {        
            pageTitle: 'Open Room',
            path: '/clinician/open-room',
            email: req.session.email
        });
    }  
    else
        res.redirect('/'); 
  };