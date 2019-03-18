peer.on('open', id => socket.emit('Clinician IDVideo', { idVideo : id }));

openStream()
.then(stream => {
    clinicianStream_temp = stream;
    playStream('SmallStream', stream);
});

peer.on('call', call => {
    openStream()
    .then(stream => {
        call.answer(stream);        
        call.on('stream', patientStream => {
            patientStream_temp = patientStream;
            playStream('LargeStream', patientStream)
        });
    })
    .catch(err => alert(err));
});