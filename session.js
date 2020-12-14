function checkIfLoggedIn(){
    const currentToken = localStorage.getItem('token');
    if(currentToken){
        if(location.href == "http://127.0.0.1:5501/login.html"){
            location.href = "/";
        }
    } else {
        if(location.href == "http://127.0.0.1:5501/") {
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