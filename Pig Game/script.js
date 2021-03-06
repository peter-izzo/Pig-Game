/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a die as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying){
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1
    var dieTwo = Math.floor(Math.random() * 6) + 1
    prevRoll.unshift(dice, dieTwo);

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // Display two dice
    var twoDiceDOM = document.querySelector('.double-dice');
    twoDiceDOM.style.display = 'block';
    twoDiceDOM.src = 'dice-' + dieTwo + '.png';

    //resets active players score upon rolling two 6's in a row and it's next player's turn
    if (dice === 6 && lastDice === 6) {
      //Player loses score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = 0;
      nextPlayer();
    //3. Update the round score IF the roller number was NOT a 1
    } else if (dice !== 1 && dieTwo !== 1){
      //Add score
      roundScore += dice + dieTwo;
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    }else {
      nextPlayer();
    }

    var lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {


  /*document.querySelector(".win-score").addEventListener('click', function(){
    winScore == document.querySelector(".win-score").value
  });*/

  if (gamePlaying) {
    //Add CURRENT score to global scores
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if player won game
    if (scores[activePlayer] >= winScore) {
      document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.double-dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    };
  }
});



function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');


      //document.querySelector('.player-0-panel').classList.remove('active');
      //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.double-dice').style.display = 'none';


}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  prevRoll = []

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.double-dice').style.display = 'none';


  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = "Player 1";
  document.getElementById('name-1').textContent = "Player 2";
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');


  winScore = 100;

  document.querySelector('.winner-score').addEventListener('click', function() {
    winScore = document.querySelector('.win-score').value
  });

}



//;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'</em>';


//var x = document.querySelector('#score-0').textContent;
//console.log(x);
