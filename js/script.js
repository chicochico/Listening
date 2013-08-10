function startActivity() {
	var name = [71, 73, 77, 66, 69, 82, 84];
	var counter = 0;
    
    playLetter("dialog");
     

    $("#letterBox").droppable({
        activeClass: "draggableStart",
        
        drop: function(event, ui) {
            deleteLetter(ui.draggable);
            $("<td></td>").text(ui.draggable.text()).appendTo("#letterBox table tr").addClass("animated bounceIn");
            counter++;
            playLetter(counter);
        },
        
        accept: function(d) {
            
            if (counter == 7) {
                $("#letterBox").addClass("okState");
            }
            
            if(d.attr("id") == name[counter]) {
                return true;
            } else {
                return false;
            }
        }    
        
        
    });

	$("#scrambleBox div").mouseover(function() {
		$(this).addClass("mouseoverLetter");
	});
	
	$("#scrambleBox div").mouseout(function() {
		$(this).removeClass("mouseoverLetter");
	});

}

function fill() {
	var scrambledAlphabet = scrambleLetters();
	
	for(var i = 0; i < 26; i++) {
		$("#scrambleBox ul").append("<div id='" + scrambledAlphabet[i].charCodeAt(0) + "'>" + scrambledAlphabet[i] + "</div>");
	}
	
	$("#scrambleBox div").addClass("draggableLetter").draggable({
		revert: "invalid"
	});
	
	$("#scrambleBox div").addClass("unselectable");
}

function scrambleLetters() {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	var auxLetter;
	var radomNumber;
	
	for(var i = 0; i < 26; i++) {
		randomNumber = Math.floor(Math.random() * 25);
		auxLetter = alphabet[i];
		alphabet[i] = alphabet[randomNumber];
		alphabet[randomNumber] = auxLetter;
	}
	
	return alphabet;
}

function deleteLetter( $item ) {
            $item.fadeOut();
            $("#letterBox").append($item);
 }

function playLetter(letter){
   
    var pathMP3="audio/" + letter +".mp3";
    var file = document.createElement('audio');
    var audioFile = document.createElement('source'); 
	audioFile.setAttribute('audio', 'audio/mpeg');
	audioFile.setAttribute('src', pathMP3);
    file.appendChild(audioFile);
    
    file.play();
}