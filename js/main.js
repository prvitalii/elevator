$(document).ready(function(){
	createControlElements();
	robotsAppear(100);
	doFlickering();
	setDefault();
	moveElevator();
	

});
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
	};
};
// create robots function
function robotsAppear(time){
	for (let i = 6; i >= 0; i--){
		time = time + 200;
		setTimeout(function (){
			// create floor divs	
			var floorArea = $("<div/>")
								.addClass("floors")
								.attr("data-val", i+1);
			var human = $("<img>")
							.attr("src", "libs/theMan.png")
							.attr("alt", "theMan");
			floorArea.append(human);
			$("#floorContainer").append(floorArea);
		}, time);
		
	};
};
// make gett in button change color(flicker) after all robots have appeared
var flickering;
function doFlickering(){
	flickering = setTimeout(function(){
		setInterval(function(){
			$("#pickPeople").addClass("greenBg");
		},500);
		setInterval(function(){
			$("#pickPeople").removeClass("greenBg");
		},1000);
	},1500);	
};
function stopFlickering(){
	clearTimeout(flickering);
};
// check for the max/min amount of people in the elevator
var elevMax = new MaxPeople(0),
	flag = true;
function MaxPeople(num){
	this.num = num;
	this.addPeople = function(){
		if (this.num > 2){
			$("#info").css("background-color", "red");
			$("#pickPeople").prop("disabled", true);
			flag = false;
		    return this.num;
		} else {
		  flag = true;
		  $("#info").css("background-color", "lightgrey");
		  return this.num++;
	  }
	};
	this.subPeople = function(){
		if (this.num < 1){
			$("#info").css("background-color", "red");
		    flag = false;
		    return this.num;
		} else {
		  	flag = true;
			$("#pickPeople").prop("disabled", false);
			$("#info").css("background-color", "lightgrey");
			return this.num--;
	  }
	};
	this.display = function(){
		if(this.num == 0){
			$("#info").text("The elevator is empty");

		} else if (this.num > 2){
			$("#info").html("The elevator is full! Max: <span style='font-size:20px; font-weight: bold; color:black'>" + this.num + "</span> people");

		} else{
			switch(this.num){
				case 1:
					$("#info").html("<span style='font-size:20px; font-weight:bold; color:black'>" + this.num + "</span><br/> person");
					break;
				default:
					$("#info").html("<span style='font-size:20px; font-weight:bold; color:black'>" + this.num + "</span><br/>people");

			} 
		}
	};

};
// get into the elevator function
$("#pickPeople").click(function(){
	getIn();
	stopFlickering();	
});
function getIn(){
	$("#pickPeople").prop("disabled", true);
	// add a person into the elevator
	elevMax.addPeople();
	var getInSignal = $(".signalLight");
	for (let i = 0, max = getInSignal.length; i < max; i++){
		if(getInSignal[i].getAttribute("data-arr") == "true" && flag == true){
			var onFloor = getInSignal[i].getAttribute("data-val");
			var floorDiv = $(".floors[data-val='" + onFloor + "']");
			var theMan = floorDiv.children();

			theMan
				.animate({
					left: "-77px",
				},1000,
					function(){
						theMan.fadeOut("slow");
						floorDiv.attr("data-ex", "none");
						elevMax.display();
			})

		}
	}
};
// get out of the evelator function
$("#sendPeople").click(getOut);
function getOut(){
	elevMax.subPeople();
	var getInSignal = $(".signalLight");
	for (let i = 0, max = getInSignal.length; i < max; i++){
		if(getInSignal[i].getAttribute("data-arr") == "true" && flag == true){
			var theMan = $("#elevator img:last-child");
			theMan
				.animate(
				{
					opacity: 1
				},500)
				.animate(
				{
					left: "-40px"
				},1000,
				function(){
					elevMax.display();
				})
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
};		
// animate elevator moving
function move(obj, elev, floorNum, floorDiv){
	obj.animate({
		top: elev
	}, 1000, 
	// set light at each floor to green if the elevator has arived
	function(){
		var signalLight = $(".signalLight[data-val='" + floorNum + "']")
								.css("background-color", "green")
								.attr("data-arr", "true");
		$("#floorScreen").text(floorNum);
		if($(".floors")[floorDiv].hasAttribute("data-ex")){
			$("#pickPeople").prop("disabled", true);
		} else {
			$("#pickPeople").prop("disabled", false);
		}
	});
};
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
				move(elevator, altittude[0], 7, 0);
				break;
			case "6":
				move(elevator, altittude[1], 6, 1);
				break;
			case "5":
				move(elevator, altittude[2], 5, 2);
				break;
			case "4":
				move(elevator, altittude[3], 4, 3);
				break;
			case "3":
				move(elevator, altittude[4], 3, 4);
				break;
			case "2":
				move(elevator, altittude[5], 2, 5);
				break;
			case "1":
				move(elevator, altittude[6], 1, 6);
				break;

			default: 
				elevator.css("top", "515px");

		};
	});
};
		