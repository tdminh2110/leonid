const User = require('../models/user');
const Clinician = require('../models/clinician');
const MyFunction = require('../models/function');
const Establishment = require('../models/establishment');

const session = require('./common/session');

exports.getAddClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    MyFunction.selectAll()
      .then(([functions, fieldData]) => {
        Establishment.selectAll()
        .then(([establishments, fieldData]) => {
          res.render('admin/add-clinician', {        
            funcs: functions, 
            estas: establishments,
            pageTitle: 'Add a Clinician',
            path: '/admin/add-clinician'
          });
        })
        .catch(err => console.log(err));   
      })    
      .catch(err => console.log(err)); 
  }  
  else
    res.redirect('/'); 
};    

exports.postAddClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    const name = req.body.name;
    const familyName = req.body.family_name;
    let birthday = req.body.birthday;
    const phone = req.body.phone;
    const idFunction = req.body.function;
    const idEstablishment = req.body.establishment;
    const email = req.body.email;
    const password = req.body.password;
    const re_password = req.body.re_password;

    let arrayBirthday = birthday.split("/");
    birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];
   
    if (password === re_password)
    {
      const user = new User(null, name, familyName, email, password, 2);
      user
        .insert()
        .then((results) => {          
          const clinician = new Clinician(results[0].insertId, birthday, phone, idFunction, idEstablishment);                   
          clinician
            .insert()
            .then(() => {
              res.redirect('/');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
    else
      res.redirect('/admin/add-clinician');  
  }
  else
    res.redirect('/');
};

exports.getAllClinicians = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    Clinician.selectAll()
    .then(([clinicians, fieldData]) => {
      res.render('admin/list-clinicians', {
        clins: clinicians,
        pageTitle: 'List of Clinicians',
        path: '/admin/list-clinicians'
      });
    });
  }
  else
    res.redirect('/');
};

