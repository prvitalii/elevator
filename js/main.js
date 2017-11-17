$(document).ready(function(){
	createControlElements();
	setDefault();
	moveElevator();
});

var flag = true;
var elevMax = new MaxPeople(0);
function MaxPeople(num){
	this.num = num;
	this.addPeople = function(){
		if (this.num > 2){
			$("#info").text("There is no more room, sorry");
			$("#info").css("background-color", "red");
		    // alert("There is no more room, sorry");
			flag = false;
		    return this.num;
		} else {
		  flag = true;
		  return this.num++;
	  }
	};
	this.subPeople = function(){
		if (this.num < 1){
			$("#info").text("The elevator is empty");
			$("#info").css("background-color", "red");
		    // alert("The elevator is empty");
		    flag = false;
		    return this.num;
		} else {
		  	flag = true;
			return this.num--;
	  }
	};
	this.display = function(){
		$("#info").text("Number of people inside: " + this.num);
	};

};


// set up default settings
function setDefault(){
	$(".signalLight[data-val='" + 1 + "']")
		.css("background-color", "green")
		.attr("data-arr", "true");
};
// crate call buttons, remote buttons, lights-indicators, safety lights;
function createControlElements(){

	var altitude = ["54", "130", "205", "280", "355", "430", "513"];
	var altitudeRev = altitude.reverse();

	for(let i = 6; i >= 0; i--){
		// create call buttons
		// and place them on each floor one above the other 
		var floorBtn = $("<div/>")
							.addClass("callBtn btn")
							.attr("data-val", i+1)
							.css("top", altitudeRev[i] + "px")
		$(".container").append(floorBtn);
		// create buttons for the elevator remote control panel
		var remoteBtn = $("<div/>")
							.addClass("btn")
							.attr("data-val", i+1)
							.text(i+1)
		$("#elevRemote").append(remoteBtn);
		// create safety lihts on each floor to indicate that 
		// elevator has arrived
		var light = $("<div/>")
						.addClass("signalLight")
						.attr("data-val", i+1)
						.css("top", altitudeRev[i]-30);
		$(".container").append(light);
		// create floor divs	
		var floorArea = $("<div/>")
							.addClass("floors")
							.attr("data-val", i+1);
		var human = $("<img>")
						.attr("src", "libs/theMan.png")
						.attr("alt", "theMan");
		floorArea.append(human);
		$("#floorContainer").append(floorArea);
	};
};
// animate elevator moving
function move(obj, elev, floor){
	obj.animate({
		top: elev
	}, 1000, 
	// set light at each floor to green if the elevator has arived
	function(){
		var signalLight = $(".signalLight[data-val='" + floor + "']")
								.css("background-color", "green")
								.attr("data-arr", "true");
		$("#floorScreen").text(floor);
	});
};
// get into the elevator function
$("#pickPeople").click(function(){
	elevMax.addPeople();
	var getInSignal = $(".signalLight");
	for (let i = 0, max = getInSignal.length; i < max; i++){
		if(getInSignal[i].getAttribute("data-arr") == "true" && flag == true){
			elevMax.display();
			var onFloor = getInSignal[i].getAttribute("data-val");
			var floorDiv = $(".floors[data-val='" + onFloor + "']");
			var theMan = floorDiv.children();

			theMan
				.animate({
					left: "-77px"
				},1000,
					function(){
						theMan.fadeOut("slow");
				})
		}
	}
});
// get out of the evelator function
$("#sendPeople").click(function(){
	elevMax.subPeople();
	var getInSignal = $(".signalLight");
	for (let i = 0, max = getInSignal.length; i < max; i++){
		if(getInSignal[i].getAttribute("data-arr") == "true" && flag == true){
			elevMax.display();
			var theMan = $("#elevator img:last-child");
			theMan
				.animate(
				{
					opacity: 1
				},500)
				.animate(
				{
					left: "-40px"
				},1000)
				.animate(
				{
					opacity: 0
				},500)
				.animate(
				{
					left: "4px"
				},1000)
		}
	}
})	
// move the elevator by clicking a button
function moveElevator(){
	var altittude = ["10", "85", "160", "235", "310", "386", "470"];
	var elevator = $("#elevator");
	$(".btn, #elevRemote div").click(function(){
		$(".signalLight").css("background-color", "red");
		$(".signalLight").attr("data-arr", false);
		var floorNumber = this.getAttribute("data-val");
		switch(floorNumber){
			case "7":
				move(elevator, altittude[0], 7);
				break;
			case "6":
				move(elevator, altittude[1], 6);
				break;
			case "5":
				move(elevator, altittude[2], 5);
				break;
			case "4":
				move(elevator, altittude[3], 4);
				break;
			case "3":
				move(elevator, altittude[4], 3);
				break;
			case "2":
				move(elevator, altittude[5], 2);
				break;
			case "1":
				move(elevator, altittude[6], 1);
				break;

			default: 
				elevator.css("top", "515px");

		};
	});
};
		