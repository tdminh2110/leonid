const User = require('../models/user');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');

exports.getLogIn = (req, res, next) => {
    if (req.session.email) {
        if (req.session.userRight == 1) {
            Clinician.selectAll()
            .then(([clinicians, fieldData]) => {
                res.render('admin/list-clinicians', {
                    clins: clinicians,
                    pageTitle: 'List of Clinicians',
                    path: '/admin/list-clinicians'
                });
            });                        
        } else if (req.session.userRight == 2) {
            // Doan nay de test tren server khong co CSDL, se bi xoa sau nay
            if (req.session.email === 'c@c') {
                res.render('clinician/open-room', {        
                    pageTitle: 'Open Room',
                    path: '/clinician/open-room',
                    email: req.session.email
                });
            } else {
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
        } else if (req.session.userRight == 3) {
            res.render('patient/main', {
                pageTitle: 'Patient',
                email: req.session.email
            });
        }
    } else {       
        res.render('common/login', {
            pageTitle: 'Log In'            
        });
    }
};

exports.postLogIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;   
    
    // Doan nay de test tren server khong co CSDL, se bi xoa sau nay
    if ((email === 'c') && (password == 'c')) {
        req.session.email = 'c@c';
        req.session.userRight = 2; 
        req.session.name = 'c' + " " + 'c';
        res.redirect('/');         
    } else if ((email === 'p') && (password === 'p')) {
        req.session.email = 'p@p';
        req.session.userRight = 3; 
        req.session.name = 'p' + " " + 'p';
        res.redirect('/');         
    } else {
        User.findByemail_pawword(email, password)
            .then(([users]) => {
                if (users.length == 1) {                
                    req.session.email = users[0].email;
                    req.session.userRight = users[0].user_right; 
                    req.session.name = users[0].name + " " + users[0].family_name;
                    res.redirect('/'); 
                }   
                else
                    console.log("Not OK");
            })
            .catch(err => console.log(err));   
    }
};

exports.getLogOut = (req, res, next) => {
    req.session.destroy();
    res.redirect('/'); 
};