var inquirer = require("inquirer");

var cards = [];

var flashcards = function() {
  inquirer.prompt([
  {
    name: "action",
    type: "list",
    message: "What kind of card are you making?",
    choices: ["Basic Card", "Cloze Card"]
  },
  { // get front
  	name: "front",
  	type: "input",
  	message: "What is the Front of the card?",
  },
  { // get back
  	name: "back",
  	type: "input",
  	message: "What is the Back of the card?",
  }
  ]).then(function(answer) {

  	var newCard;

    // switch statements are generally used for when you have a really long list of potential cases, but this is still a totally valid use case.
    // Also, when using switch statements, you want to make sure to have a `default:` case to catch any cases that fall through. Not necessary
    // here, but just a best practice to keep in mind.
    switch (answer.action) {
      case "Basic Card":
		newCard = new BasicCards(answer.front, answer.back);
		newCard.getFront();
		newCard.getBack();
        break;

      case "Cloze Card":
      	newCard = new ClozeCards(answer.front, answer.back);
      	newCard.partial();
        // just a couple small typos
      	newCard.getCloze();
      	newCard.fullText();
      	break;
    }

    cards.push(newCard);
  });
};


function BasicCards(front, back) {
	  this.front = front;
	  this.back = back;

	// return new BasicCards(front,back);
};

function ClozeCards(text, cloze) {

	  this.text = text;
	  this.cloze = cloze;
	  this.error();

	  // this.fullText = function(){
	  // 	return this.text
	  // }
	  // this.getCloze = function (){
	  // 	return this.cloze
	  // }
	  // this.partial = function(){
	  // 	var partialText = this.text.replace(this.cloze, "...");

	  // 	return partialText
	  // }
	  // this.error = function(answer, response){
	  // 	// if repsonse is not inside of answer log error
	  // 	if(!(response === answer)){
	  // 		console.log("Error: Enter correct information");
	  // 	}
	  // }

	// return new BasicCards(text,cloze);

}

// really liked that you made these methods on the prototype 👌
BasicCards.prototype.getFront = function(){
	console.log(this.front);
};

BasicCards.prototype.getBack = function(){
	console.log(this.back);
};

ClozeCards.prototype.fullText = function() {
	console.log(this.text);
};

ClozeCards.prototype.getCloze = function() {
	console.log(this.cloze);
};

ClozeCards.prototype.partial = function() {
  // nice use of the `.replace` method here
	var partialText = this.text.replace(this.cloze, "...");
	console.log(partialText);
};

ClozeCards.prototype.error = function(response,answer) {
  // so this is totally valid, but keep in mind that you could also use the `!==` operator instead
	if(!(response === answer)){
	  		console.log("Error: Enter correct information");
	  	}

};




var firstPresident = new BasicCards(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// "George Washington"
// console.log(firstPresident.back); 

var firstPresidentCloze = new ClozeCards(
    "George Washington was the first president of the United States.", "George Washington");

flashcards();
// firstPresidentCloze.fullText();
// firstPresidentCloze.error();
// firstPresidentCloze.getCloze();
// firstPresidentCloze.partial();


// // "George Washington"
// console.log(firstPresidentCloze.getCloze()); 

// // // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial()); 

// // // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText());


// // // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze = ("This doesn't work", "oops");
// firstPresidentCloze.brokenCloze.error();


// looks like you might have accidentally copy/pasted all your code which was causing the inquirer prompt to be run twice at once.

