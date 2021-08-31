function checkIfLoggedIn(){
    const currentToken = localStorage.getItem('token');
    if(currentToken){
        if(location.href.includes("/login.html")
        || location.href.includes("/register.html")){
            location.href = "/";
        }
    } else {
        //if I am currently not logged in
        //and trying to access an unauthorized page
        //(trying to access all pages besides login)
        if(!location.href.includes("/login.html")
        && !location.href.includes("/register.html")) {
            location.href = '/login.html';
    //     }http://127.0.0.1:5501/login.html http://127.0.0.1:5501/login.html
      } 
      
   }

}

function logOut(){
    localStorage.removeItem('token');
    location.href = '/login.html';
};

checkIfLoggedIn();