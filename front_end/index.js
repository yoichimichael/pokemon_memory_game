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
            } else{
                alert("There is no user with that username. Check your spelling! LOSER!")
            }
        })
    } else if (e.target.textContent === "Log Out"){
        authDiv.style.display = "block"
        userDiv.innerHTML = ""
        userDiv.dataset.userId = ''
    }
})
// document.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     const newUserName = e.target[0].value
//     fetch(USERS_URL,{
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//             username: e.target[0].value
//         })
//     })
//     .then(response => response.json())
//     .then(newUser =>{
//         document.querySelector('#user-div').innerHTML=`<p>Welome ${newUser.username}</p>`
//         document.querySelector('#user-div').dataset.userId = newUser.id
//         document.querySelector('#sign-up').style.display = "none"
//     })
//     // change display to reflect created user
//     // hide sign-up and sign-in form
// })