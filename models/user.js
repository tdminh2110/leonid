const db = require('../util/database');

module.exports = class DS_User {
    constructor(id, name, familyName, email, password, userRight) {
        this.id = id;
        this.name = name;
        this.familyName = familyName;        
        this.email = email;
        this.password = password;
        this.userRight = userRight;
    }

    insert() {        
        return db.execute(
            'INSERT INTO DS_User (name, family_name, email, password, user_right) VALUES (?, ?, ?, ?, ?)',
            [this.name, this.familyName, this.email, this.password, this.userRight]
        );
    }

    static findByemail_pawword(email, password) {
        return db.execute('SELECT * FROM DS_User WHERE (email = ?) and (password = ?)',
            [email, password]
        );
    }
};