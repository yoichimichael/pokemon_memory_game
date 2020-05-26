const USERS_URL = "http://localhost:3000/users"
const headers = {"Content-Type":"application/json", "Accept":"application/json"}

document.addEventListener("DOMContentLoaded", ()=>{

})

document.addEventListener('submit', (e)=>{
    e.preventDefault()
    const newUserName = e.target[0].value
    fetch(USERS_URL,{
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            username: e.target[0].value
        })
    })
    .then(response => response.json())
    .then(console.log)
})