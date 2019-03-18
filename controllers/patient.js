const fs = require('fs');

const session = require('./common/session');

exports.postUploadMultiFiles = (req, res, next) => {
    if (session.checkSession(req, 3)) {
        for(i = 0; i < req.files.length; i++) {
            let uploadLocation = __dirname + '/../public/uploads/game01/' + req.files[i].originalname // where to save the file to. make sure the incoming name has a .wav extension                    
            fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.files[i].buffer)), (err) => {
                if (err) {
                    console.log('Error: ', err);
                    res.status(500).send('An error occurred: ' + err.message);
                } else {                    
                    res.status(200).send('ok');
                }
            }); // write the blob to the server as a file  
        }
    } else
        res.redirect('/');
};

exports.postUploadSingleFile = (req, res, next) => {
    if (session.checkSession(req, 3)) {        
        let uploadLocation = __dirname + '/../public/uploads/game02/' + req.file.originalname // where to save the file to. make sure the incoming name has a .wav extension                    
        fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)), (err) => {
            if (err) {
                console.log('Error: ', err);
                res.status(500).send('An error occurred: ' + err.message);
            } else {                    
                res.status(200).send('ok');
            }
        }); // write the blob to the server as a file          
    } else
        res.redirect('/');
};