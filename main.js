const path = require('path');
var fs = require('fs');
var http = require('http');

var https = require('https');

const privateKey = fs.readFileSync('server.key'); 
const certificate = fs.readFileSync('server.cert'); 

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const errorController = require('./controllers/error');

const webApp = express();

webApp.set('view engine', 'ejs');
webApp.set('views', 'views');

const adminRoutes = require('./routes/admin');
const clinicianRoutes = require('./routes/clinician');
const patientRoutes = require('./routes/patient');
const logInOutRoutes = require('./routes/log-in-out');

const sockets = require('./controllers/common/sockets');

webApp.use(bodyParser.urlencoded({ extended: false}));
webApp.use(express.static(path.join(__dirname, 'public')));
webApp.use(
    session({
        secret: 'our secret',
        resave: false,
        saveUninitialized: false
    })
);

/*let httpServer = http.createServer(webApp);
sockets.startSocketServer(httpServer);
httpServer.listen(8080);*/

let httpsServer = https.createServer({key: privateKey, cert: certificate}, webApp);
sockets.startSocketServer(httpsServer);
httpsServer.listen(8080);

/*var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, webApp);
sockets.startSocketServer(httpsServer);
httpsServer.listen(9090);*/

webApp.use('/admin', adminRoutes);
webApp.use('/clinician', clinicianRoutes);
webApp.use('/patient', patientRoutes);

webApp.use(logInOutRoutes);

webApp.use(errorController.get404);

/*const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const errorController = require('./controllers/error');
const db = require('./util/database');

const webApp = express();

webApp.set('view engine', 'ejs');
webApp.set('views', 'views');

const adminRoutes = require('./routes/admin');
const clinicianRoutes = require('./routes/clinician');
const logInOutRoutes = require('./routes/log-in-out');
const socketRoutes = require('./routes/socket');

webApp.use(bodyParser.urlencoded({ extended: false}));
webApp.use(express.static(path.join(__dirname, 'public')));
webApp.use(
    session({
        secret: 'our secret',
        resave: false,
        saveUninitialized: false
    })
);

webApp.listen(8080);

webApp.use('/admin', adminRoutes);
webApp.use('/clinician', clinicianRoutes);
webApp.use('/socket', socketRoutes);

webApp.use(logInOutRoutes);

webApp.use(errorController.get404); */