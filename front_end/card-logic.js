// console.log("second js file")

// `°~,_,~°`This is the actual game logic`°~,_,~°`
let flippedCards = []
let score = 0
let strikes = 0 
let moves = 0
const startGameLoop = () =>{
    const cardsContainer = document.getElementById('cards-container') 
    const cardImageSrcs = addPokemonCards()
    window.setTimeout(function(){hideCards();}, 2000);
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
                  console.log("you're a looooossseerrrr");
                  endGame()
                }
            }, 1200)           
        }
    }
}

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
