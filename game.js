//.ready method will help setup our connection with the HTML page
//Establish variables for all elements on the HTML page
//Will need to setup variables for magic number 
//Need variable for wins
//Need variable for losses
//Need variable for total score
$(document).ready(function() {
	var magicNumber;
	var totalScore = 0;
	var wins = 0;
	var losses = 0;
	var crystal1Num;
	var crystal2Num;
	var crystal3Num;
	var crystal4Num;
//Behind the scenes, generate a number that the user will guess
//Add a value to each of the buttons 'crystals' on the page
//The random number shown at the start of the game should be between 19 - 120.
//Each crystal should have a random hidden value between 1 - 12.
	function newNumbers() {
		magicNumber = Math.floor(Math.random() * 101) + 20;
		crystal1Num = Math.ceil(Math.random() * 12) + 1;
		crystal2Num = Math.ceil(Math.random() * 12) + 1;
		crystal3Num = Math.ceil(Math.random() * 12) + 1;
		crystal4Num = Math.ceil(Math.random() * 12) + 1;
	}
//Establish value of attribute in each element 
//Call newNumbers function into the newGame function to setup logic 
//Could possibly clean this up with .each() or .map() method. Ask Andrew if it matters
	function newGame() {
		newNumbers();
		totalScore = 0;
		$("#magicNumber").text(magicNumber);
		$("#totalScore").text(totalScore);
		$("#crystal1").attr("data-crystalvalue", crystal1Num);
		$("#crystal2").attr("data-crystalvalue", crystal2Num);
		$("#crystal3").attr("data-crystalvalue", crystal3Num);
		$("#crystal4").attr("data-crystalvalue", crystal4Num);
		$("#wins").text(wins);
		$("#losses").text(losses);
		$("#winOrLose").text("");

	
	}
//Setup functions for winning and losing 
	function youWin() {
		$("#winOrLose").text("YOU WIN!");
		wins++;
		$("#wins").text(wins);
	}

	function youLose() {
		$("#winOrLose").text("YOU LOSE");
		losses++;
		$("#losses").text(losses);
	}

	newGame();

	$(".crystalimg").hover(function() {
		$(this).css({opacity: 0.3});
	},
	function() {
		$(this).css({opacity: 1});
	});

// Function to add the crystal values together
	$(".crystalimg").on("click", function() {
		if (totalScore >= magicNumber) {
			return;
		}
//This variable will convert .attr("data-crystalvalue") into an integer with parseInt
		var crystalValue = $(this).attr("data-crystalvalue");
		crystalValue = parseInt(crystalValue);
//Use an assignment operator += to add the values of the crystals the user selects
		totalScore += crystalValue;
//Plug the total score for the user to reference and continue guessing
		$("#totalScore").text(totalScore);

		if (totalScore === magicNumber) {
			youWin();
		} else if (totalScore > magicNumber) {
			youLose();
		}
	});
//Create a click feature for the newgame to start. Call newGame in the function to reset
	$(".btn").on("click", function() {
		newGame();
	});

});