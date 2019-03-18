socket.on('Who are you ?', function(data) {
    socket.emit('Patient Email', { 'email' : myEmail });
});  

socket.on('Clinician', function(data) {    
    openStream()
    .then(stream => {
        patientStream_temp = stream;
        let call = peer.call(data.idVideo, stream);
        call.on('stream', clinicianStream => {
            clinicianStream_temp = clinicianStream;
            playStream('clinicianStream', clinicianStream);
        });
    });
});

function myOnUnLoad () {                        
    socket.close();
}

socket.on('Game01', function(data) {    
    let status = data['status'];
    
    if (data['order'] == 1) {
        $('#MainScreenVideo').hide();
        $('#MainScreenGame').show();       

        selectTypeSupportedMediaRecorder();

        recordedBlobMain = [];    

        try {            
            mediaRecorderMain = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);        
        } catch (e) {    
            alert(e);
            return;
        }
        mediaRecorderMain.onstop = (event) => {            
            console.log('Recorder stopped: ', event);
            //alert('Main stopped');
        };
        mediaRecorderMain.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                recordedBlobMain.push(event.data);
            }             
        });
        mediaRecorderMain.start(10); // collect 10ms of data
        /////////////////////////////////////////////////////////////////////
        
        recordedBlobs = [];  
        countBlob = 0;
        recordedBlobTemp = [];        
        try {            
            console.log(patientStream_temp);
            mediaRecorderTemp = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);        
            //mediaRecorderTemp = new MediaRecorder(patientStream_temp, "{mimeType: 'audio/webm'}");        
        } catch (e) {    
            alert(e);
            return;
        }
        mediaRecorderTemp.onstop = (event) => {    
            recordedBlobs[countBlob] = recordedBlobTemp;
            countBlob++;
            recordedBlobTemp = [];
            mediaRecorderTemp.start(10);
        };
        mediaRecorderTemp.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {                            
                recordedBlobTemp.push(event.data);
            }             
        });
        mediaRecorderTemp.start(10); // collect 10ms of data
    }

    var image = document.createElement('img');

    switch (status) {
        case 'show-image':
            image.src = "/games/game1/image" + data['order'] + ".jpg";
            image.width = '600';

            if (data['order'] != 1) {
                mediaRecorderTemp.stop(); 
            }

            break;

        default:
            mediaRecorderTemp.stop(); 
            recordedBlobs[countBlob] = recordedBlobTemp;
            recordedBlobTemp = [];

            mediaRecorderMain.stop();                    
            
            let formData = new FormData();

            let blobs = [];
            let blobMain = new Blob(recordedBlobMain, {type: 'video/mp4'});
            formData.append('videos[]', blobMain, 'whole.mp4');

            for(i = 0; i <= countBlob; i++) {
                blobs[i] = new Blob(recordedBlobs[i], {type: 'video/mp4'});
                formData.append('videos[]', blobs[i], 'whole' + i + '.mp4');
            }   
            
            fetch('/patient/upload-multifiles', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
                })
            }).then(
                //alert('upload recording complete.')
                success => console.log('upload recording complete.')
            ).catch(function(err) {
                alert("Loi: " + err);
            }); 

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();   
            break;         
    }
    
    if (status != 'finish') {
        $("#MainScreenGame").empty();
        $("#MainScreenGame").prepend(image);
    }
});

socket.on('Game02', function(data) {    
    let status = data['status'];
    
    switch (status) {
        case 'show-image':
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();       

            selectTypeSupportedMediaRecorder();

            recordedBlobMain = [];    

            try {            
                mediaRecorderMain = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);        
            } catch (e) {    
                alert(e);
                return;
            }
            mediaRecorderMain.onstop = (event) => {            
                console.log('Recorder stopped: ', event);
                //alert('Main stopped');
            };
            mediaRecorderMain.ondataavailable = ((event) => {
                if (event.data && event.data.size > 0) {            
                    recordedBlobMain.push(event.data);
                }             
            });
            mediaRecorderMain.start(10); // collect 10ms of data

            var image = document.createElement('img');
            image.src = "/games/game2/image.jpg";
            image.width = '1000';

            $("#MainScreenGame").empty();
            $("#MainScreenGame").prepend(image);

            break;

        case 'finish':
            mediaRecorderMain.stop();                    
            
            let formData = new FormData();
            
            let blobMain = new Blob(recordedBlobMain, {type: 'video/mp4'});
            formData.append('video', blobMain, 'whole-game02.mp4');            
            
            fetch('/patient/upload-singlefile', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
                })
            }).then(
                //alert('upload recording complete.')
                success => console.log('upload recording complete.')
            ).catch(function(err) {
                alert("Loi: " + err);
            }); 

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();   
            
            break;         
    }
});

socket.on('Game03', function(data) {    
    let status = data['status'];
    
    switch (status) {
        case 'start-recording':
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();       

            selectTypeSupportedMediaRecorder();

            recordedBlobMain = [];    

            try {            
                mediaRecorderMain = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);        
            } catch (e) {    
                alert(e);
                return;
            }
            mediaRecorderMain.onstop = (event) => {            
                console.log('Recorder stopped: ', event);
                //alert('Main stopped');
            };
            mediaRecorderMain.ondataavailable = ((event) => {
                if (event.data && event.data.size > 0)  {            
                    recordedBlobMain.push(event.data);
                }             
            });
            mediaRecorderMain.start(10); // collect 10ms of data

            var div = document.createElement('div');
            div.setAttribute('class', 'w3-display-container w3-white w3-border w3-border-red');
            div.width = '600';
            div.height = '600';            

            $("#MainScreenGame").empty();
            $("#MainScreenGame").prepend(div);

            break;

        case "pause":
            mediaRecorderMain.pause();

            break;

        case "resume":
            mediaRecorderMain.resume();

            break;

        case "repeat":
            recordedBlobMain = [];    
            mediaRecorderMain.stop();
            mediaRecorderMain.start(10);
            
            break;

        case 'finish':
            mediaRecorderMain.stop();                    
            
            let formData = new FormData();
            
            let blobMain = new Blob(recordedBlobMain, {type: 'video/mp4'});
            formData.append('video', blobMain, 'whole-game03.mp4');            
            
            fetch('/patient/upload-singlefile', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
                })
            }).then(
                //alert('upload recording complete.')
                success => console.log('upload recording complete.')
            ).catch(function(err) {
                alert("Loi: " + err);
            }); 

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();   
            
            break;         
    }
});



function selectTypeSupportedMediaRecorder() {
    /*typeSupportedMediaRecorder = {mimeType: 'video/webm;codecs=vp9'};    
    if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {
        typeSupportedMediaRecorder = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {      
            typeSupportedMediaRecorder = {mimeType: 'video/webm'};
            if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {        
                typeSupportedMediaRecorder = {mimeType: ''};
            }
        }        
    }*/

    typeSupportedMediaRecorder = {mimeType: 'video/mp4'};    
    if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {
        typeSupportedMediaRecorder = {mimeType: 'video/mp4'};
        if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {      
            typeSupportedMediaRecorder = {mimeType: 'video/mp4'};
            if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorderMain.mimeType)) {        
                typeSupportedMediaRecorder = {mimeType: ''};
            }
        }        
    }
}