
socket.on('Who are you ?', function(data) {
    socket.emit('Clinician Email', { 'email' : myEmail });
});

socket.on('Patient', function(data) {    
    openStream()
    .then(stream => {        
        clinicianStream_temp = stream;
        let call = peer.call(data.idVideo, stream);        
        call.on('stream', patientStream => {
            patientStream_temp = patientStream;
            playStream('LargeStream', patientStream);
        });
    });
});

function myOnUnLoad () {                        
    socket.close();
}