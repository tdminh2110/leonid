peer.on('open', id => socket.emit('Patient IDVideo', { idVideo : id }));

peer.on('call', call => {
    openStream()
    .then(stream => {        
        patientStream_temp = stream;
        call.answer(stream);
        call.on('stream', clinicianStream => {
            clinicianStream_temp = clinicianStream;
            playStream('clinicianStream', clinicianStream);
        });
    })
    .catch(err => alert(err));
});

//mediaSource.addEventListener('sourceopen', handleSourceOpen, false);

$(document).on("click", "#record", function(e) {
    recordedBlobsMain = [];
    
  /*  let options = {mimeType: 'video/webm;codecs=vp9'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {      
            options = {mimeType: 'video/webm'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {        
                options = {mimeType: ''};
            }
        }        
    }
*/
    selectTypeSupportedMediaRecorder();

    //startRecord(mediaRecorderMain, typeSupportedMediaRecorderMain);

    try {
        //mediaRecorder = new MediaRecorder(patientStream_temp, options);        
        mediaRecorderMain = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorderMain);        
    } catch (e) {    
        alert(e);
        return;
    }
    
    mediaRecorderMain.onstop = (event) => {
        alert('Recorder stopped: ', event);
        console.log('Recorder stopped: ', event);
    };
    
    //mediaRecorderMain.ondataavailable = handleDataAvailableOfMain;

    mediaRecorderMain.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {
            if (mediaRecorderMain == mediaRecorderMain) {           
                recordedBlobsMain.push(event.data);
            } else if (mediaRecorderMain == mediaRecorderTemp) {
                recordedBlobsTemp.push(event.data);
            }
        }
    });


    mediaRecorderMain.start(10); // collect 10ms of data*/
});

$(document).on("click", "#stoprecord", function(e) {
    mediaRecorderMain.stop();    
});

$(document).on("click", "#download", function(e) {
    //const blob = new Blob(recordedBlobsMain, {type: 'video/webm'});
    const blob = new Blob(recordedBlobs[2], {type: 'video/webm'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
});

$(document).on("click", "#upload", function(e) {

    const blob = new Blob(recordedBlobsMain, {type: 'video/webm'});

    let formData = new FormData();
    formData.append('minh', blob, 'minh.webm');
    
    let serverUrl = '/patient/upload';    

    // start upload
    fetch(serverUrl, {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
          })
    }).then(
        success => console.log('upload recording complete.')
    ).catch(
        error => console.error('an upload error occurred!')
    );
});


/*function handleSourceOpen(event) {
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
}*/

function handleDataAvailableOfMain(event) {
    if (event.data && event.data.size > 0) {
        recordedBlobsMain.push(event.data);
    }
}

function selectTypeSupportedMediaRecorder() {
    typeSupportedMediaRecorderMain = {mimeType: 'video/webm;codecs=vp9'};    
    if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {
        typeSupportedMediaRecorderMain = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {      
            typeSupportedMediaRecorderMain = {mimeType: 'video/webm'};
            if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {        
                typeSupportedMediaRecorderMain = {mimeType: ''};
            }
        }        
    }

    typeSupportedMediaRecorderTemp = {mimeType: 'video/webm;codecs=vp9'};    
    if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderTemp.mimeType)) {
        typeSupportedMediaRecorderTemp = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderTemp.mimeType)) {      
            typeSupportedMediaRecorderTemp = {mimeType: 'video/webm'};
            if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderTemp.mimeType)) {        
                typeSupportedMediaRecorderTemp = {mimeType: ''};
            }
        }        
    }
}

function startRecord(mediaRecorder, typeSupportedMediaRecorder) {
    try {
        mediaRecorder = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);        
    } catch (e) {    
        alert(e);
        return;
    }
    
    mediaRecorder.onstop = (event) => {
        alert('Recorder stopped: ', event);
        console.log('Recorder stopped: ', event);
    };
    
    mediaRecorder.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {
            if (mediaRecorder == mediaRecorderMain) {           
                recordedBlobsMain.push(event.data);
            } else if (mediaRecorder == mediaRecorderTemp) {
                recordedBlobsTemp.push(event.data);
            }
        }
    });

    mediaRecorder.start(10); // collect 10ms of data
}
