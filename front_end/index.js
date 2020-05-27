const USERS_URL = "http://localhost:3000/users"
const headers = {"Content-Type":"application/json", "Accept":"application/json"}

document.addEventListener("DOMContentLoaded", ()=>{

})

// New user creation

document.addEventListener('click', (e)=>{
    const inputName = document.querySelector("#login-field").value
    const userDiv = document.querySelector('#user-div')
    const authDiv = document.querySelector('#auth-div')
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
                const startGame = document.createElement('button')
                startGame.id="start-button"
                startGame.textContent = "Start Game"
                const cardsContainer = document.getElementById('cards-container')
                cardsContainer.appendChild(startGame)
            } else{
                alert("There is no user with that username. Check your spelling! LOSER!")
            }
        })
    } else if (e.target.textContent === "Log Out"){
        authDiv.style.display = "block"
        userDiv.innerHTML = ""
        userDiv.dataset.userId = ''
    } else if (e.target.id === "start-button"){
        e.target.style.display = 'none'
        loadBoard()
    }
})

const loadBoard = () =>{
    addPokemonCards()
}

const addPokemonCards = () =>{
    const cardsContainer = document.getElementById('cards-container')
    const newCardSet = newPokemonSetof20()
    newCardSet.forEach(pokeAdress =>{
        const newDiv = document.createElement('div')
        newDiv.className = "poke-card-div"
        const newImg = document.createElement('img')
        newImg.src = pokeAdress
        newDiv.appendChild(newImg)
        cardsContainer.appendChild(newDiv)
    })
}


const newPokemonSetof20 = () => {
    let setOf10 = []
    for(let i = 0; i<10;i++){
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