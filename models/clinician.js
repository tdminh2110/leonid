const db = require('../util/database');

module.exports = class DS_Clinician {
    constructor(idUser, birthday, phone, idFunction, idEstablishment) {
        this.idUser = idUser;
        this.birthday = birthday;
        this.phone = phone;
        this.idFunction = idFunction;
        this.idEstablishment = idEstablishment;
    }

    static selectAll() {
        let strQuery =  'SELECT DS_User.name as DSUserName, DS_User.family_name, DS_User.email, ' +
                              'DATE_FORMAT(DS_Clinician.birthday,"%d/%m/%Y") as birthday, DS_Clinician.phone, ' +
                              'DS_Function.name as DSFunctionName, ' +
                              'DS_Establishment.name as DSEstablishmentName ' +
                        'FROM DS_User, DS_Clinician, DS_Function, DS_Establishment ' +
                        'WHERE (DS_User.id = DS_Clinician.id_user) and (DS_User.user_right = 2) and ' +
                              '(DS_Function.id = DS_Clinician.id_function) and ' +
                              '(DS_Establishment.id = DS_Clinician.id_establishment) ' +
                        'ORDER BY DS_User.name';
                        
        return db.execute(strQuery);
    }

    insert() {
        return db.execute(
            'INSERT INTO DS_Clinician (id_user, birthday, phone, id_function, id_establishment) VALUES (?, ?, ?, ?, ?)',
            [this.idUser, this.birthday, this.phone, this.idFunction, this.idEstablishment]
        );
    }

    static findUserIDByemail(email) {
        let strQuery =  'SELECT DS_Clinician.id_user as IDClinician ' +
                        'FROM DS_User, DS_Clinician ' +
                        'WHERE (DS_User.id = DS_Clinician.id_user) and (DS_User.email = ?) ';

        return db.execute(strQuery, [email]);
    }
};