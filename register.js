let registerForm = document.getElementById("registerForm");
let apiUrl = "http://localhost:3000";




registerForm.addEventListener("submit", (e)=>{
    e.preventDefault();
                                       // console.log(registerForm);
    let payload = {
         name: registerForm.name.value,
         email: registerForm.email.value,
         password: registerForm.password.value
    }
    console.log(payload);
  fetch(apiUrl+ "/register", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((response)=>{
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("something went wrong");
        }
    }) //fetch returns a promise already
    .then((response)=>{
        location.href = `/login.html?existingEmail=${payload.email}&registered=true`;
        // localStorage.setItem('token', response.token)
        // location.href = "/";
        // console.log("response");
    })
    .catch((error)=>{
        location.href = `/login.html?existingEmail=${payload.email}`
    })
})
