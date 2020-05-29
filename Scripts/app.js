$(document).ready(function() {

const deck = ['2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
              '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
              '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
              '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD'];


let dealerHand;
let playerHand;
let dealerValue;
let playerValue;


// Function using Math.floor & .random to get random card from the deck
function getCard(handValue) {
let randomCard = Math.floor(Math.random() * handValue.length);
return handValue[randomCard];
}

// Function that iterates through array of hand and sums up cards/hand value in total
function calcHandvalue(hand) {
let total = 0;


for (let i = 0; i < hand.length; i++ ) {
  total += calcCardValue(hand[i],total);
}
  return total;
}

// Function that calculates Deck Cards values
// card.slice(0,card.length-1) = To exclude last char of string, so it will leave out H(hearts), C(clubs), S(spade) and D(diamonds) char and we assign values to cards.
function calcCardValue(card, total) {
  if(card.slice(0,card.length-1) == 'J' || card.slice(0,card.length-1) == 'Q' || card.slice(0,card.length-1) == 'K') {
    return 10;
  } else if (card.slice(0,card.length-1) == 'A') {
      if (total + 11 > 21 ) {
        return 1;
      } else {
        return 11;
      }
  } else {
    // makes string to integer, otherwise we would have string and number and calcCardValue won't work.
    return parseInt(card.slice(0,card.length-1));
  }    
}


$("#hit-button").hide();
$("#stand-button").hide();
$("#reset-button").hide();


// Starts a Game, deals Hands, calculates hand values, adds result-text and creates game-area/board
$("#new-game-button").on("click", function() {

dealerHand = [getCard(deck), getCard(deck)];
playerHand = [getCard(deck), getCard(deck)];  
dealerValue = calcHandvalue(dealerHand);
playerValue = calcHandvalue(playerHand);

$("#dealer-score")
  .text("Dealer Hand Score: " + dealerValue)
  .prepend();

// creating new img tag to parent div to show cards visuals. 
$("#dealer-hand")
.css("background-color", "green")
.prepend($("<img>", {id:"DC1", src:"Cards/"+dealerHand[0]+".png"}))
.prepend($("<img>", {id:"DC1", src:"Cards/"+dealerHand[1]+".png"}));

// creating new img tag to parent div to show cards visuals. 
$("#player-hand")
.css("background-color", "green")
.prepend($("<img>", {id:"PC1", src:"Cards/"+playerHand[0]+".png"}))
.prepend($("<img>", {id:"PC1", src:"Cards/"+playerHand[1]+".png"}));

$("#player-score")
.text("Player Hand Score: " + playerValue)
.append();  

$("#result")
  .text("")
  .insertAfter("#player-score");

// Creating game-board  
$("#game-area")
  .css("margin", "20px")
  .css("position", "relative")
  .css("width", "900px")
  .css("height", "350px")
  .css("border", "2px solid white")
  .css("display", "inline-block")
  .css("border-radius", "10%")
  .css("padding","50px")
  .css("background-color", "green")
  .css("box-shadow", "2px 2px 5px");

$("#dealer-hand").show();
$("#player-hand").show();
$("#hit-button").show();
$("#stand-button").show();
$("#reset-button").hide();
$("#new-game-button").hide();
$("#text-area").hide();

});



// Hit button fucntion, if we click hit player gets extra card
$("#hit-button").on("click", function()  {
playerHand.push(getCard(deck));

// adding extra card image, .length-1 to get last card image on board.
$("#player-hand")
.append($("<img>", {id:"PC1", src:"Cards/"+playerHand[playerHand.length-1]+".png"}))

// recalculating new hand value everytime player gets extra card
playerValue = calcHandvalue(playerHand)

//Conditionals
if (playerValue > 21) {
  $("#player-score")
  .text("Player Score: " + playerValue)
  .insertAfter("#player-hand");

  $("#result")
  .text("Player Busts, Dealer WON!")
  .insertAfter("#player-score");

  $("#reset-button").show();
  $("#stand-button").hide();
  $("#hit-button").hide();
} else {
  $("#player-score")
  .text("Player Score: " + playerValue)
  .insertAfter("#player-hand");    
}

});




// stand button function. When Dealers value is less than 16 after player stands, dealer gets 1 more card to improve his hand value.
$("#stand-button").on("click", function () {

// Conditioanls whats happens after plaer click stand button
if (dealerValue < 16 ) {
  dealerHand.push(getCard(deck));
  dealerValue = calcHandvalue(dealerHand);

  $("#dealer-hand")
  .append($("<img>", {id:"PC1", src:"Cards/"+dealerHand[dealerHand.length-1]+".png"}))

  $("#dealer-score")
  .text("Dealer Score: " + dealerValue)
  .prepend();
}

if (dealerValue > 21){
  $("#result")
  .text("Dealer Busts, Player WON!")
  .insertAfter("#player-score");  

} else if (playerValue > dealerValue) {
  $("#player-score")
  .text("Player Score: " + playerValue)
  .insertAfter("#player-score"); 
  
  $("#result")
  .text("Player WON!")
  .insertAfter("#player-score");

} else if (playerValue == dealerValue) {
  $("#player-score")
  .text("Player Score: " + playerValue)
  .insertAfter("#player-score"); 
  
  $("#result")
  .text("It's a DRAW!")
  .insertAfter("#player-score");    

} else {
  $("#player-score")
  .text("Player Score: " + playerValue)
  .insertAfter("#player-score");
  
  $("#result")
  .text("Dealer WON!")
  .insertAfter("#player-score");
}

$("#reset-button").show();
$("#hit-button").hide();
$("#stand-button").hide();

});

// finally, restart game function to restart a game. 
$("#reset-button").on("click", function() {
$("#dealer-hand img").remove();
$("#player-hand img").remove();
$("#new-game-button").click();

});

});





