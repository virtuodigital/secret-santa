/* /////////////////////////////////////////////////////////////   

Copyright (C) 2016 Diego Guzman (diego@virtuodigital.com)

The code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.   

/////////////////////////////////////////////////////////////*/


// Change these names //
// array containing the names of the participants
var names = ['Bob', 'Mary', 'Jack', 'Anne', 'Michael', 'James']; 

// just declaring vars here
// clicked is to check if person already ckicked the hat
// chosen is to check if a receiver has already been chosen by someone else
var giver, receiver, clicked, chosen;

// pairs loads the pairs that have already been made from pairs.json
var pairs;
$.getJSON("assets/pairs.json", function(json){
    pairs = json;
});


// populate select field on page1 with names from the array above
var select = document.getElementById("person"); 
for(var i = 0; i < names.length; i++) {
    var opt = names[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

// on page1 assign the user to the giver var and go to page 2
$('#person').on('change', function(e) {
  e.preventDefault();
  giver = $("select[name='person']").val(); 
  showLayer('page2');
});


// showLayer() shows and hides the divs in the html file as if they where different pages
// So first show page1 as default
var currentLayer = 'page1'; 
function showLayer(lyr) { 
	hideLayer(currentLayer); 
	document.getElementById(lyr).style.visibility = 'visible'; 
	currentLayer = lyr; 


	// if you're on page2 check if this person already clicked the hat
  	if(lyr=='page2'){

  		clicked = false;
  		receiver = '';

  		setTimeout(function(){ // the timeout is merely aesthetic to show a spining cog	

	  		// if the pairs.json file is empty it means nobody has clicked yet
	  		if(pairs == undefined){
		        clicked = false
		  	}else{
		  		// else go through pairs.json and check if this person already clicked
		  		for(i=0;i<pairs.length;i++){	
	            	if(pairs[i]["giver"] == giver){
            			clicked = true;
            			receiver = pairs[i]["receiver"];
            			break;
	            	} 
	            }	
	  		}
	  		// this is self explanatory
	  		if(clicked){
	        	showLayer('page3');
	        }else{
	        	showLayer('page4');
	        }

  			
  		}, 1000);
	}

	// if this person already chose, show who they got paired to
	if(lyr=='page3'){
		$(".person").html(giver);
		$(".receiver").html(receiver);
	}

	// if not, have them click the hat
	if(lyr=='page4'){
		$(".person").html(giver);
		$('.hat').on('click', function() {
			showLayer('page5');
		});	
	}


	// once the hat is clicked ...
	if(lyr=='page5'){
		receiver = '';
		chosen = false;


		setTimeout(function(){ // the timeout is merely aesthetic to show the spining cog

				(function checkIfTaken(){
					// pick random name from array
					randnum = Math.floor((Math.random() * names.length));
					receiver = names[randnum];

					// set the chosen var as false to begin with
					chosen = false;

					// if pairs.json is empty and the giver didn't pick his/her own name
					if(pairs == undefined && giver != receiver){
						chosen = false;
					// if giver picked his/her own name out of the hat
				  	}else if(giver == receiver){
				  		chosen = true;
				  	// else pair the giver to the receiver
				  	}else{
				  		for(i=0;i<pairs.length;i++){	
			            	if(pairs[i]["receiver"] == receiver){
		            			chosen = true;
		            			break;
			            	}
			            }
				    }
				    // if receiver hasn't been picked yet go to page6
				    if(chosen == false){
				    	showLayer('page6')
				    }else{
				    	// else re-run this function
				    	checkIfTaken();
				    }
				}());			
  		}, 1000);
	}


	// all went well we can now save...
	if(lyr=='page6'){
		// Show the pair that has just been made
		$(".person").html(giver);
		$(".receiver").html(receiver);

		// POST to a server side language that will save to pair.json
		$.post("assets/save-pair.php", {
		    giver: giver,
		    receiver: receiver
		});

		// the back button will refresh so we can refresh the js file as well
		$('.back').on('click', function() {
			location.reload();
		});
	}

} 


// hide the pages that are not supposed to be visible (view showLayer function)
function hideLayer(lyr) { 
  document.getElementById(lyr).style.visibility = 'hidden'; 
}

// back button on any page goes back to page 1
$('.back').on('click', function(e) {
  e.preventDefault();
  showLayer('page1');
});


// shake hat effect, this needs jquery ui
setInterval(function(){
	$(".hat").effect( "shake", {times:4, distance:5}, 500 );
}, 2500);


// change the js src so browsers won't cache 
rand = Math.floor((Math.random() * 10));
document.getElementById("js").src="assets/js.js?v="+rand;




