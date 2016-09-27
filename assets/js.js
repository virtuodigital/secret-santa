// array containing the names of the participants
var names = ['Popón', 'Mamá Bertha', 'Guero', 'Mayra', 'Eva', 'Paulina', 'Luis', 'Diego']; 

// clicked is to check if person already ckicked the hat
// chosen is to check if a receiver has already been chosen by someone else
var giver, receiver, clicked, chosen;

// pairs loads the pairs that have already been made
var pairs;
$.getJSON("assets/pairs.json", function(json){
    pairs = json;
});

// multipage form functions
var currentLayer = 'page1'; 
function showLayer(lyr) { 
	hideLayer(currentLayer); 
	document.getElementById(lyr).style.visibility = 'visible'; 
	currentLayer = lyr; 


  	if(lyr=='page2'){

  		clicked = false;
  		receiver = '';

  		setTimeout(function(){ // the timeout is merely aesthetic to show the spining cog		  	
	  		if(pairs == undefined){
		        clicked = false
		  	}else{
		  		for(i=0;i<pairs.length;i++){	
	            	if(pairs[i]["giver"] == giver){
            			clicked = true;
            			receiver = pairs[i]["receiver"];
            			break;
	            	} 
	            }	
	  		}
	  		if(clicked){
	        	showLayer('page3');
	        }else{
	        	showLayer('page4');
	        }

  			
  		}, 1000);
	}


	if(lyr=='page3'){
		// this person already chose
		$(".person").html(giver);
		$(".receiver").html(receiver);
	}


	if(lyr=='page4'){

		$(".person").html(giver);
		$('.hat').on('click', function() {
			showLayer('page5');
		});	
	}


	if(lyr=='page5'){

		// $(".person").html(giver);
		receiver = '';
		chosen = false;


		setTimeout(function(){ // the timeout is merely aesthetic to show the spining cog
				(function checkIfTaken(){
					randnum = Math.floor((Math.random() * names.length));
					receiver = names[randnum];
					console.log(receiver);
					chosen = false;
					if(pairs == undefined && giver != receiver){
						chosen = false;
				  	}else if(giver == receiver){
				  		chosen = true;
				  	}else{
				  		for(i=0;i<pairs.length;i++){	
			            	if(pairs[i]["receiver"] == receiver){
		            			chosen = true;
		            			break;
			            	}
			            }
				    }
				    if(chosen == false){
				    	showLayer('page6')
				    }else{
				    	checkIfTaken();
				    }
				}());			
  		}, 1000);
	}


	if(lyr=='page6'){

		$(".person").html(giver);
		$(".receiver").html(receiver);

		$.post("assets/save-pair.php", {
		    giver: giver,
		    receiver: receiver
		});

		$('.back').on('click', function() {
			location.reload();
		});
	}

} 


function hideLayer(lyr) { 
  document.getElementById(lyr).style.visibility = 'hidden'; 
}


// populate select field page1
var select = document.getElementById("person"); 
for(var i = 0; i < names.length; i++) {
    var opt = names[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

// multipage triggers
// page1
$('#person').on('change', function(e) {
  e.preventDefault();
  giver = $("select[name='person']").val(); 
  showLayer('page2');
});

// go back to page 1
$('.back').on('click', function(e) {
  e.preventDefault();
  showLayer('page1');
});


// shake hat
setInterval(function(){
	$(".hat").effect( "shake", {times:4, distance:5}, 500 );
}, 2500);




// change the js src so browsers won't cache 
rand = Math.floor((Math.random() * 10));
document.getElementById("js").src="assets/js.js?v="+rand;




