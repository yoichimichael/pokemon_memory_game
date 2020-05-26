const USERS_URL = "http://localhost:3000/users"
const headers = {"Content-Type":"application/json", "Accept":"application/json"}

document.addEventListener("DOMContentLoaded", ()=>{

})

// New user creation

document.addEventListener('click', (e)=>{
    if (e.target.textContent ==="Sign Up" ){
        e.preventDefault()
        const inputName = document.querySelector("#login-field").value
        fetch(USERS_URL)
        .then(response => response.json())
        .then(users => {
            const foundUser = users.find(function (user){return user.username === inputName})
            if (foundUser){
                // Change display to "logged in state"
            } else{
                // Display error message on DOM
            }
        })
    } else if (e.target.textContent === "Log In"){

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