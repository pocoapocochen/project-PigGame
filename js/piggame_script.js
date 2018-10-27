/*
Coded by learning 'The Complete JavaScript Course 2018: Build Real Projects!' course on Udemy
 */

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. 
  Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
  After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to 
  his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game
*/


// define players' current score, round score using array, and current player
var score, currentScore, currentPlayer, playStatus;

// set init condition
init();

// event listener: click the 'roll dice' button
document.querySelector('.btn-roll').addEventListener('click', function(){
    //  0. if there is a winner, then block the hold button
    if (playStatus){
	    // 1. create random number
	    var diceNum = Math.floor(Math.random() * 6) + 1;
	    document.querySelector('.dice').style.display = 'block';
	    document.querySelector('.dice').src = 'img/dice-'+ diceNum +'.png';

	    // 2. if dice is not equal to 1, then keep add number and show on current score, if dice is 1, then change another player
	    if (diceNum !== 1) {
	    	currentScore += diceNum;
	        document.getElementById('current-' + currentPlayer).textContent = currentScore;
	    } else {
	    	// next player
	    	nextPlayer();
	    }
    }
});
   
 
// event listener: click the 'hold' button
document.querySelector('.btn-hold').addEventListener('click', function(){
    // 0. if there is a winner, then block the hold button
    if (playStatus){
	    // 1. store the current score to variable and change UI
	    score[currentPlayer] += currentScore;
	    document.getElementById('score-' + currentPlayer).textContent = score[currentPlayer];
	    
	    // 2. and set current score back to 0
	    document.getElementById('current-' + currentPlayer).textContent = 0;

	    // 3. implement the winner condition
        // - check the round score
        // - if the player win, then mutate the 'player' to 'winner'
        // - and remove the current player mark (red round dot)
	    if (score[currentPlayer] >= 50) {
	    	document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
	    	document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
	    	document.getElementById('name-' + currentPlayer).textContent = 'Winner!'
	    	playStatus = false;
	    } else {
	        // 4. if not, change another player and continue
	    	nextPlayer();

	    }
    }
});


// event listener: click the 'new game' button
document.querySelector('.btn-new').addEventListener('click', init);


// change the next player and do somthing
function nextPlayer(){
	currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
	currentScore = 0;
		    	
	// 1. prepare to store current score for another player
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
		    	
	// 2. switch current player mark
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

    // 3. hide dice
	document.querySelector('.dice').style.display = 'none';
}


// init function
function init(){

	// 1. let the default score set to 0, and hide the dice
	score = [0, 0];
	currentScore = 0;
	currentPlayer = 0;
	playStatus = true;

	document.querySelector('.dice').style.display = 'none';

	// 2. set all scores to 0
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	
	// 3. set player title to 'player'
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');	
	document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');

	// 4. set player 1 to be the active one (remove all first)
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

}
