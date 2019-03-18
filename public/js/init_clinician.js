const socket = io("https://cursa:8080");

const peer = new Peer();

var clinicianStream_temp;
var patientStream_temp;

function openStream() {
    const config = {    
        audio : true, 
        video : {
            width : { exact : 1280 },
            height : { exact : 720 }
        }
    };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.controls = false;
    video.play();
}

// Parameters of Game 1
const GAME1_NUMBER_OF_IMAGES = 5;

