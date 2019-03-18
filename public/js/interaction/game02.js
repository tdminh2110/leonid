socket.on('Game02', function(data) {    
    let status = data['status'];
        
    var image = document.createElement('img');
    var p = document.createElement('p');
    var button = document.createElement('button');
    button.setAttribute('id', 'btControl-game02');
    button.setAttribute('class', 'w3-button w3-green w3-round-xxlarge');    

    switch (status) {
        case "show-image":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();
            playStream('SmallStream', patientStream_temp);

            image.src = "/games/game2/image.jpg";
            image.width = '800';
            button.innerHTML = "Finish";                        
            p.appendChild(button);       

            $("#MainScreenGame").empty();   
            $("#MainScreenGame").prepend(image);   
            $("#MainScreenGame").append(p);   

            break;
        
        case 'finish':
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);
            break;
    }
});

$(document).on("click", "#Test2", function(e) {                 
    var html = "<input class='w3-check' type='checkbox' checked='checked' /><label>Record Voice</label></br>";
    html += "<input class='w3-check' type='checkbox' checked='checked' /><label>Record Video</label></br>";
    html += "<label>Language:</label>&nbsp;<select><option value='fr'>France</option><option value='en'>English</option></select></br>";
    html += "<button id='RunTest02' class='w3-button w3-green w3-round-xxlarge'>Run</button>";

    $('#MainNavigator').html(html);            
});

$(document).on("click", "#RunTest02", function(e) {
    socket.emit('Game02', { 'status' : 'start' });
});

$(document).on("click", "#btControl-game02", function(e) {     
    socket.emit('Game02', { 'status' : 'finish' });    
}); 