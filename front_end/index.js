const USERS_URL = "http://localhost:3000/users"
const SCORES_URL = "http://localhost:3000/scores"
const headers = {"Content-Type":"application/json", "Accept":"application/json"}

document.addEventListener("DOMContentLoaded", ()=>{
    // loadHighScores()
})

// loading highscores

// const loadHighScores = () => {
//     const scoreBoard = document.getElementById('score-board')
//     fetch(SCORES_URL)
//     .then(response => response.json())
//     .then(scores =>{
//         console.log(scores)
//         const playerScores = []
//         scores.forEach(score => {
//             playerScores.push(score.score)})
//         console.log(playerScores)
//         const topScoreArray = []
//         for (let i = 0;i<6;i++){
//             topScoreArray.push(playerScores[i])
//         }
//         topScoreArray.forEach(score =>{
//             const newLi = document.createElement('li')
//             newLi.textContent = `${score}`
//             scoreBoard.appendChild(newLi)
//         })
//     })
// }

// New user creation

document.addEventListener('click', (e)=>{
    // console.log(e.target)
    const cardsContainer = document.getElementById('cards-container')
    const inputName = document.querySelector("#login-field").value
    const userDiv = document.querySelector('#user-div')
    const authDiv = document.querySelector('#auth-div')
    const scorePanel = document.getElementById('score-panel')
    if (e.target.textContent ==="Sign Up" ){
        fetch(USERS_URL)
        .then(response => response.json())
        .then(users => {
            const foundUser = users.find(function (user){return user.username === inputName})
            if (foundUser){
                alert("This username is already taken!")
                document.querySelector("#login-field").value = ""
            } else{
                fetch(USERS_URL, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        username: inputName
                    })
                })
                .then(response => response.json())
                .then(newUser => {
                    userDiv.innerHTML=`<p>Welome ${newUser.username}!</p><br><button id="log-out">Log Out</button>`
                    userDiv.dataset.userId = newUser.id
                    authDiv.style.display = "none"
                    loadStartButton()
                })
            }
        })
    } else if (e.target.textContent === "Log In"){
        fetch(USERS_URL)
        .then(response => response.json())
        .then(users => {
            const foundUser = users.find(function (user){return user.username === inputName})
            if (foundUser){
                // document.querySelector('#error').style.display = "block"
                userDiv.innerHTML=`<p>Welome ${foundUser.username}!</p><br><button id="log-out">Log Out</button>`
                userDiv.dataset.userId = foundUser.id
                authDiv.style.display = "none"
                document.querySelector("#login-field").value = ""
                scorePanel.style.boxShadow = "0px 0px 5px"
                loadStartButton()
                loadScore(foundUser.id)
            } else{
                alert("There is no user with that username. Check your spelling! LOSER!")
            }
        })
    } else if (e.target.textContent === "Log Out"){
        authDiv.style.display = "block"
        userDiv.innerHTML = ""
        userDiv.dataset.userId = ''
        cardsContainer.innerHTML = ''
        scorePanel.innerHTML = ''
    } else if (e.target.id === "start-button"){
        // loadScore(userDiv.dataset.userId)
        strikes = 0
        e.target.style.display = 'none'
        startGameLoop()
        // gameMaster()
    }
})


// Load start game button
const loadStartButton = () =>{
    const startGame = document.createElement('button')
    startGame.id="start-button"
    startGame.textContent = "Start Game"
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.appendChild(startGame)
}
// Loading Score
const loadScore = (userId) => {
    // console.log(userId)
    const scorePanel = document.getElementById('score-panel')
    scorePanel.innerHTML=''
    fetch(SCORES_URL)
    .then(response => response.json())
    .then(scores =>{
        const playerScores = scores.filter(score => score.user_id === userId)
        // console.log(playerScores)
        const scoreArray = []
        playerScores.forEach(score => {
            scoreArray.push(score.score)
        })
        let highScore = Math.max(...scoreArray)
        // console.log(highScore)
        if (highScore < 0){
            highScore = 0
        }
        // console.log(highScore)
        const scoreDiv = document.createElement('div')
        scoreDiv.textContent = `Your High Score: ${highScore}`
        scorePanel.appendChild(scoreDiv)
    })
}

// This stuff loads cards to the board

const addPokemonCards = () =>{

    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.innerHTML = ''
    const newCardSet = newPokemonSetof20()
    newCardSet.forEach(pokeAddress =>{
      const newPokeDiv = document.createElement('div')
      newPokeDiv.className = "scene"
      const newPokeCard = document.createElement('div')
      newPokeCard.className = "card"
      const newFrontDiv = document.createElement('div')
      newFrontDiv.className = "card__face card__face--front"
      newFrontDiv.style.backgroundImage = `url(${pokeAddress})`
      const newBackDiv = document.createElement('div')
      newBackDiv.style.backgroundImage =`url("https://media.giphy.com/media/jQbinPsqqfg8GFxbQw/giphy.gif")`
      newBackDiv.className = "card__face card__face--back"
      newPokeCard.appendChild(newFrontDiv)
      newPokeCard.appendChild(newBackDiv)
      newPokeDiv.appendChild(newPokeCard)
      cardsContainer.appendChild(newPokeDiv)
    })
    return newCardSet
}


const newPokemonSetof20 = () => {
    let setOf10 = []
    for(let i = 0; i < 10; i++){
        setOf10.push(`./assets/${randomPokemonNumber()}.png`)
    }
    let setof20 = setOf10.concat(setOf10)
    randomizeArray(setof20)
    return setof20
}

const randomizeArray= (array) =>{
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
}

const randomPokemonNumber = ()=>{
    let pokeInt = Math.floor(Math.random()*(151) + 1)
    if (pokeInt > 99){
        return pokeInt
    } else if( pokeInt > 9) {
        let pokeString = pokeInt.toString()
        let pokeString2 = "0" + pokeString
        return pokeString2
    } else{
        let pokeString = pokeInt.toString()
        pokeString = "00" + pokeString
        return pokeString
    }
}

// Old random set function
    // setOf10.forEach(pokeAddress=>{
    //     let coinFlip = Math.floor(Math.random()*(2) + 1)
    //     if (coinFlip === 2){
    //         newSet.push(pokeAddress)
    //     } else if (coinFlip ===1){
    //         newSet.unshift(pokeAddress)
    //     }
    // })
    // setOf10.forEach(pokeAddress=>{
    //     let coinFlip = Math.floor(Math.random()*(2) + 1)
    //     if (coinFlip === 2){
    //         newSet.push(pokeAddress)
    //     } else if (coinFlip ===1){
    //         newSet.unshift(pokeAddress)
    //     }
    // })
    // return newSet

// Old Game Listener
// document.addEventListener('click', (e)=>{
//     if(e.target.className === "card__image"){
//         // e.target.parentNode.parentNode.classList.toggle('is-flipped');
        
//         if (e.target.style.opacity === "0"){
//             e.target.style.opacity = "1"
//             if(firstImage===false){
//                 firstImage = e.target
//                 console.log(firstImage)
//             } else if(firstImage===true){
//                 if (firstImage.src===e.target.src){
//                     firstImage = ''
//                     score++
//                     console.log(score)
//                 } else{
//                     e.target.style.opacity = "0"
//                     firstImage.style.opacity = "0"
//                     strikes++
//                     console.log(strikes)
//                     if (strikes>2){
//                         cardsContainer.innerHTML = ''
//                         const startGame = document.createElement('button')
//                         startGame.id="start-button"
//                         startGame.textContent = "Start Game"
//                         cardsContainer.appendChild(startGame)
//                         return "game over"
//                     }
//                 }
//             }
//         }
        
//     }
// })