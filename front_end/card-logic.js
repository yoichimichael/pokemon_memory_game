// console.log("second js file")

// `°~,_,~°`This is the actual game logic`°~,_,~°`
let flippedCards = []
let score = 0
let strikes = 0 
let moves = 0
const startGameLoop = () =>{
    const endGameModal = document.getElementById('end-game')
    endGameModal.style.display = "none"
    const cardsContainer = document.getElementById('cards-container') 
    const cardImageSrcs = addPokemonCards()
    window.setTimeout(function(){hideCards();}, 3000);
    console.log(cardImageSrcs)
}

const hideCards = () =>{
    const cards = document.querySelectorAll('.card')
    for(let i=0;i<cards.length;i++){
        cards[i].classList.toggle('is-flipped')
        cards[i].addEventListener('click', (e) => {
            flipCard(cards[i])
    })
}}

const flipCard = (node) =>{
    node.classList.toggle('is-flipped')
    node.classList.toggle('disabled')
    flippedCards.push(node)
    if (flippedCards.length === 2){
        moves++
        if (flippedCards[0].children[0].style.backgroundImage === flippedCards[1].children[0].style.backgroundImage){
            console.log(flippedCards)
            score++
            flippedCards = []
            if(score === 10){
              // console.log("You win loooooosseerrr")
              saveScore(score);
              winGame()
            }
            // change styling to demonstrate match
        }else{
            setTimeout(function(){
                flippedCards[0].classList.toggle('disabled')
                flippedCards[0].classList.toggle('is-flipped')
                flippedCards[1].classList.toggle('disabled')
                flippedCards[1].classList.toggle('is-flipped')
                strikes++              
                flippedCards = []                
                console.log(`${strikes} strikes`)
                if(strikes === 3){
                  // console.log("you're a looooossseerrrr");
                  saveScore(score);
                  endGame();
                }
            }, 1200)           
        }
    }
}

const endGame = () => {
  const endGameModal = document.getElementById('end-game')
  const modalDisplayBox = document.getElementById('modal-display-box')
  const modalSpan = document.querySelector(".close")
  endGameModal.style.display = "block"
  modalDisplayBox.textContent = "Game Over LOOOOOOOOOOSSSSERRRRR"
  const startGame = document.createElement('button')
  startGame.id="start-button"
  startGame.textContent = "Play Again"
  modalDisplayBox.appendChild(startGame)

  // console.log(endGameModal)
};

const winGame = () => {
  const endGameModal = document.getElementById('end-game')
  const modalDisplayBox = document.getElementById('modal-display-box')
  const modalSpan = document.querySelector(".close")
  endGameModal.style.display = "block"
  modalSpan.textContent = "You Win LOOOOOOOOOOSSSSERRRRR"
  const startGame = document.createElement('button')
  startGame.id="start-button"
  startGame.textContent = "Start Game"
  modalDisplayBox.appendChild(startGame)
};

const saveScore = (score) => {
  const userDiv = document.getElementById('user-div')
  fetch(SCORES_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      score: score,
      user_id: userDiv.dataset.userId
    })
  })
  .then(resp => resp.json())
  .then(scoreObj => {
    const modalDisplayBox = document.getElementById('modal-display-box')
    const scoreCard = document.createElement('div')
    scoreCard.textContent = `Your score: ${scoreObj.score}`
    modalDisplayBox.appendChild(scoreCard)
  })
};

// const gameMaster = () => {
//     while(strikes > 2){
//       console.log("3 strikes")
    // }
    // Show Timer on page
    // setInterval(timer,1000)

    // Show End Game Screen, High Scores, Start New Game
    // setInterval(gameOver, 300000)
// }

const timer = ()=>{

}

const gameOver = () =>{
    
}
