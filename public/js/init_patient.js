const socket = io("https://cursa:8080");

const peer = new Peer();

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let sourceBuffer;

let typeSupportedMediaRecorder;

let mediaRecorderMain;
let recordedBlobMain;

let mediaRecorderTemp;
let recordedBlobs;
let recordedBlobTemp;
let countBlob;

let clinicianStream_temp;
let patientStream_temp;

function openStream() {
    const config = {    audio : true, 
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

function handleSourceOpen(event) {
    console.log('MediaSource open');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
}