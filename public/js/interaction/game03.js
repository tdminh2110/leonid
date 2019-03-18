let MAX_SECONDS_GAME03 = 60;
let SCALE_GAME03 = 100 / MAX_SECONDS_GAME03;
let countSecond;
let idInterval;

socket.on('Game03', function(data) {    
    let status = data['status'];
    
    var p = document.createElement('p');
    var button1 = document.createElement('button');
    button1.setAttribute('id', 'btControl1-game03');
    button1.setAttribute('class', 'w3-button w3-green w3-round-xxlarge');
    var button2 = document.createElement('button');
    button2.setAttribute('id', 'btControl2-game03');
    button2.setAttribute('class', 'w3-button w3-green w3-round-xxlarge');    
    var div = document.createElement('div');
    div.setAttribute('class', 'w3-light-grey');
    var divBar = document.createElement('div');
    divBar.setAttribute('id', 'myBar');
    divBar.setAttribute('class', 'w3-container w3-green w3-center');
    divBar.setAttribute('style', 'width:0%');   

    switch (status) {
        case "start-recording":
            $('#MainScreenVideo').show();
            $('#MainScreenGame').show();            

            button1.innerHTML = "Pause";            
            button1.setAttribute('value', 'pause');

            button2.innerHTML = "Finish";            
            button2.setAttribute('value', 'finish');

            divBar.innerHTML = "0s";
            div.appendChild(divBar);

            p.appendChild(button1);       
            p.appendChild(button2);       
            p.appendChild(div);

            countSecond = 0;

            $("#MainScreenGame").empty(); 
            $("#MainScreenGame").append(p);  

            move();

            break;

        case "pause":            
            clearInterval(idInterval);

            button1.innerHTML = "Resume";            
            button1.setAttribute('value', 'resume');

            button2.innerHTML = "Repeat";            
            button2.setAttribute('value', 'repeat');
            
            divBar.style.width = Math.round(countSecond * SCALE_GAME03) + '%'; 
            divBar.innerHTML = countSecond  + 's';
            div.appendChild(divBar);

            p.appendChild(button1);       
            p.appendChild(button2);       
            p.appendChild(div);

            $("#MainScreenGame").empty();           
            $("#MainScreenGame").append(p);   

            break;

        case "resume":
            button1.innerHTML = "Pause";            
            button1.setAttribute('value', 'pause');

            button2.innerHTML = "Finish";            
            button2.setAttribute('value', 'finish');
            
            divBar.style.width = Math.round(countSecond * SCALE_GAME03) + '%'; 
            divBar.innerHTML = countSecond  + 's';
            div.appendChild(divBar);

            p.appendChild(button1);       
            p.appendChild(button2);       
            p.appendChild(div);

            $("#MainScreenGame").empty();           
            $("#MainScreenGame").append(p);   

            move();

            break;

        case "repeat":
            button1.innerHTML = "Pause";            
            button1.setAttribute('value', 'pause');

            button2.innerHTML = "Finish";            
            button2.setAttribute('value', 'finish');

            divBar.innerHTML = "0s";
            div.appendChild(divBar);

            p.appendChild(button1);       
            p.appendChild(button2);       
            p.appendChild(div);

            countSecond = 0;

            $("#MainScreenGame").empty(); 
            $("#MainScreenGame").append(p);  

            move();    

            break;
        
        case 'finish':
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            break;
    }
});

$(document).on("click", "#Test3", function(e) {  
    var html = "<input class='w3-check' type='checkbox' checked='checked' /><label>Record Voice</label></br>";
    html += "<input class='w3-check' type='checkbox' checked='checked' /><label>Record Video</label></br>";
    html += "<label>Language:</label>&nbsp;<select><option value='fr'>France</option><option value='en'>English</option></select></br>";
    html += "<button id='RunTest03' class='w3-button w3-green w3-round-xxlarge'>Run</button>";

    $('#MainNavigator').html(html);            
});

$(document).on("click", "#RunTest03", function(e) {
    socket.emit('Game03', { 'status' : 'start' });
});

$(document).on("click", "#btControl1-game03", function(e) {     
    if ($(this).attr('value') === 'pause') {    
        socket.emit('Game03', { 'status' : 'pause' });    
    } else if ($(this).attr('value') === 'resume') {    
        socket.emit('Game03', { 'status' : 'resume' });    
    }
}); 

$(document).on("click", "#btControl2-game03", function(e) {     
    if ($(this).attr('value') === 'finish') {    
        socket.emit('Game03', { 'status' : 'finish' });    
    } else if ($(this).attr('value') === 'repeat') {    
        socket.emit('Game03', { 'status' : 'repeat' });    
    }
}); 

function move() {
    var elem = document.getElementById("myBar");           
    var width = 0;
    idInterval = setInterval(frame, 1000);    
    function frame() {
        if (countSecond == MAX_SECONDS_GAME03) {
            clearInterval(idInterval);
            socket.emit('Game03', { 'status' : 'finish' });
        } else {
            countSecond++; 
            width = Math.round(countSecond * SCALE_GAME03);         
            elem.style.width = width + '%'; 
            elem.innerHTML = countSecond  + 's';
        }
    }
}