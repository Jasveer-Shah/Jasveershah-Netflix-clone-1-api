let loginForm = document.getElementById("loginForm");
let apiUrl = "http://localhost:3000";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const existingEmail = urlParams.get('existingEmail');
const registered = urlParams.get('registered');
if (existingEmail) {
    loginForm.email.value = existingEmail
}
if (registered) {
    document.querySelector('.registered-alert').style.display = "block";
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(loginForm);
    let payload = {
        email: loginForm.email.value,
        password: loginForm.password.value
    }
    fetch(apiUrl + "/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("something went wrong");
            }
        }) //fetch returns a promise already
        .then((response) => {
            localStorage.setItem('token', response.token)
            location.href = "/";
            console.log(response);
        })
})



// https://meet.google.com/aem-puab-zvx