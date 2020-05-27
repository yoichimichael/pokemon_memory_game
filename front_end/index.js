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
        // e.preventDefault()
        fetch(USERS_URL)
        .then(response => response.json())
        .then(users => {
            const foundUser = users.find(function (user){return user.username === inputName})
            if (foundUser){
                // document.querySelector('#error').style.display = "block"
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
        loadBoard()
    }
})

const loadBoard = () =>{
    const cardsContainer = document.getElementById('cards-container')

}