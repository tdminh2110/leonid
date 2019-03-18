socket.on('Game01', function(data) {    
    let status = data['status'];

    if (data['order'] == 1) {
        $('#MainScreenVideo').hide();
        $('#MainScreenGame').show();
        playStream('SmallStream', patientStream_temp);
    }
    
    var image = document.createElement('img');
    var p = document.createElement('p');
    var button = document.createElement('button');
    button.setAttribute('id', 'btControl-game01');
    button.setAttribute('class', 'w3-button w3-green w3-round-xxlarge');    

    switch (status) {
        case 'finish':
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);
            break;
        
        default:
            image.src = "/games/game1/image" + data['order'] + ".jpg";
            image.width = '800';  
            if (Number(data['order']) < GAME1_NUMBER_OF_IMAGES) {
                button.innerHTML = "Next";
            } else {
                button.innerHTML = "Finish";
            }
            
            button.setAttribute('value', data['order']);
            p.appendChild(button);       
    }

    if (status != 'finish') {    
        $("#MainScreenGame").empty();   
        $("#MainScreenGame").prepend(image);   
        $("#MainScreenGame").append(p);   
    }
});

$(document).on("click", "#Test1", function(e) {                 
    var html = "<input class='w3-check' type='checkbox' checked='checked' /><label>Record Voice</label></br>";
    html += "<input class='w3-check' type='checkbox' checked='checked' /><label>Record Video</label></br>";
    html += "<label>Language:</label>&nbsp;<select><option value='fr'>France</option><option value='en'>English</option></select></br>";
    html += "<button id='RunTest01' class='w3-button w3-green w3-round-xxlarge'>Run</button>";

    $('#MainNavigator').html(html);            
});

$(document).on("click", "#RunTest01", function(e) {
    socket.emit('Game01', { 'status' : 'start' });
});

$(document).on("click", "#btControl-game01", function(e) {    
    if ($(this).attr('value') < GAME1_NUMBER_OF_IMAGES) {
        socket.emit('Game01', { 'status' : 'show-image', 'order' : $(this).attr('value') });
    } else {        
        socket.emit('Game01', { 'status' : 'finish' });
    }
});