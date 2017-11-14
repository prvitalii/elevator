$(document).ready(function(){
	createCallBtn();
	createElevBtn();
	moveElevator();
});

// crate call buttons and place them on each floor one above the other;
// <div style="bottom:50px;"  class="floorRem">
//		 <div class="btn" data-val="1"></div>
// </div>
// create signal light
// <div class="signalLight"></div>
function createCallBtn(){
	var altitude = ["54", "130", "205", "280", "355", "430", "513"];
	var altitudeRev = altitude.reverse();

	for(let i = 6; i >= 0; i--){
		var btnDiv = $("<div/>")
						.addClass("floorRem")
						.css("top", altitudeRev[i] + "px")
		var btn = $("<div/>")
						.addClass("btn")
						.attr("data-val", i+1);
		var light = $("<div/>")
						.addClass("signalLight")
						.attr("data-val", i+1)
						.css("top", altitudeRev[i]-30);
		btnDiv.append(btn);
		$(".container").append(btnDiv);
		$(".container").append(light);
	};
}

// create buttons for the elevator remote panel
// <div class="btn" data-val=""></div>
function createElevBtn(){
	for (let i = 7; i > 0; i--){
		var elevBtn = $("<div/>")
						.addClass("btn")
						.attr("data-val", i)
						.text(i);
		$("#remote").append(elevBtn);
	}
}

// animate moving
function move(obj, elev, floor){
	obj.animate({
		top: elev
	}, 1000, 
	function(){
		var signalLight = $(".signalLight[data-val='" + floor + "']")
								.css("background-color", "green");
	});
};
// move the elevator by clicking a button
function moveElevator(){
	var altittude = ["10", "85", "160", "235", "310", "386", "470"];
	var elevator = $("#elevator");
	$(".btn").click(function(){
		$(".signalLight").css("background-color", "red");
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
		