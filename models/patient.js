const db = require('../util/database');

module.exports = class DS_Patient {
    constructor(idUser, idClinician, birthday, address, phone, contactPersonName, contactPersonFamilyName, contactPersonEmail, 
                contactPersonAddress, contactPersonPhone) {    
        this.idUser = idUser;
        this.idClinician = idClinician;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.contactPersonName = contactPersonName;
        this.contactPersonFamilyName = contactPersonFamilyName;
        this.contactPersonEmail = contactPersonEmail;
        this.contactPersonAddress = contactPersonAddress;
        this.contactPersonPhone = contactPersonPhone;
    }

    static selectAll(idClinician) {

        let strQuery =  'SELECT DS_User.name as DSUserName, DS_User.family_name, DS_User.email, ' +
                              'DATE_FORMAT(DS_Patient.birthday,"%d/%m/%Y") as birthday, DS_Patient.phone ' +                              
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_User.user_right = 3) and ' +                              
                              '(DS_Patient.id_clinician = ?) ' + 
                        'ORDER BY DS_User.name';
                        
        return db.execute(strQuery, [idClinician]);
    }    

    insert() {
        return db.execute(
            'INSERT INTO DS_Patient (id_user, id_clinician, birthday, address, phone, cp_name, cp_family_name, cp_email, cp_address, cp_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.idUser, this.idClinician, this.birthday, this.address, this.phone, this.contactPersonName, this.contactPersonFamilyName, this.contactPersonEmail,
             this.contactPersonAddress, this.contactPersonPhone]
        );
    }
    
    static findUserIDByemailIDClinician(email, idClinician) {
        let strQuery =  'SELECT DS_Patient.id_user as IDPatient ' +
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_User.email = ?) and (DS_Patient.id_clinician = ?)';

        return db.execute(strQuery, [email, idClinician]);
    }
};