const socketio = require('socket.io')

let clinician_socket = null;
let patient_socket = null;

module.exports = {
    startSocketServer: function (app) {
        io = socketio.listen(app);  

        io.sockets.on('connection', function (socket) {
            console.log("new connection: " + socket.id);
            socket.emit("Who are you ?", "Hi");
            
            socket.on('disconnect', disconnect => {
                console.log("disconnect: " + socket.id);
                if (clinician_socket != null) {                                                  
                    if (clinician_socket.idSocket == socket.id) {                        
                        clinician_socket = null;
                    }
                }

                if (patient_socket != null) {
                    if (patient_socket.idSocket == socket.id) {
                        patient_socket = null;
                    }
                }
            });

            socket.on('Clinician Email', (data, fn) => {
                if (data['email'] != null) {                  
                    if (clinician_socket == null) {                                 
                        clinician_socket = { 'idSocket' : socket.id, 'idVideo' : null, 'email' : data['email'] }; 
                    }
                }
            });

            socket.on('Clinician IDVideo', (data, fn) => {
                if (data['idVideo'] != null) {
                    if (clinician_socket != null) {
                        clinician_socket.idVideo = data['idVideo'];

                        if (patient_socket != null) {
                            if (patient_socket['idVideo'] != null) {
                                socket.emit('Patient', { 'idVideo' : patient_socket.idVideo});                                
                            }
                        }
                    }
                }
            }); // end socket.on(Clinician)
            
            socket.on('Patient Email', (data, fn) => {                                                      
                if (patient_socket == null) {
                    if (data['email'] != null) { 
                        patient_socket = { 'idSocket' : socket.id, 'idVideo' : null, 'email' : data['email'] }; 
                    }
                }
            });

            socket.on('Patient IDVideo', (data, fn) => { 
                if (data['idVideo'] != null) {
                    patient_socket.idVideo = data['idVideo'];

                    if (clinician_socket != null) {
                        if (clinician_socket['idVideo'] != null) {
                            socket.emit('Clinician', { 'idVideo' : clinician_socket.idVideo});                                
                        }
                    }

                }
            }); // end socket.on(Patient)

            socket.on('Game01', (data, fn) => {
                switch (data['status']) {
                    case 'start':
                        socket.emit('Game01', { 'status' : 'show-image', 'order' : '1'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game01', { 'status' : 'show-image', 'order' : '1'});
                        break;

                    case 'finish':
                        socket.emit('Game01', { 'status' : 'finish'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game01', { 'status' : 'finish'});
                        break;

                    default:
                        socket.emit('Game01', { 'status' : 'show-image', 'order' : Number(data['order']) + 1 });
                        socket.broadcast.to(patient_socket.idSocket).emit('Game01', { 'status' : 'show-image', 'order' : Number(data['order']) + 1 });
                        break;
                }
            });

            socket.on('Game02', (data, fn) => {
                switch (data['status']) {
                    case 'start':
                        socket.emit('Game02', { 'status' : 'show-image'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game02', { 'status' : 'show-image'});
                        break;

                    case 'finish':
                        socket.emit('Game02', { 'status' : 'finish'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game02', { 'status' : 'finish'});
                        break;
                }
            });

            socket.on('Game03', (data, fn) => {
                switch (data['status']) {
                    case 'start':
                        socket.emit('Game03', { 'status' : 'start-recording'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game03', { 'status' : 'start-recording'});
                        break;
                    
                    case 'pause':
                        socket.emit('Game03', { 'status' : 'pause'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game03', { 'status' : 'pause'});
                        break;

                    case 'resume':
                        socket.emit('Game03', { 'status' : 'resume'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game03', { 'status' : 'resume'});
                        break;

                    case 'repeat':
                        socket.emit('Game03', { 'status' : 'repeat'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game03', { 'status' : 'repeat'});
                        break;

                    case 'finish':
                        socket.emit('Game03', { 'status' : 'finish'});
                        socket.broadcast.to(patient_socket.idSocket).emit('Game03', { 'status' : 'finish'});
                        break;
                }
            });

        });
    }
};