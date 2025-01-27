const emailnav = document.getElementById('email');
emailnav.addEventListener('click', emailrelocate);

function emailrelocate(){
    window.location.href = "http://localhost:8002/email";
}

const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', Logout);
function Logout(){
    document.cookie = "uid=;";
    location.reload();
}

function deletebtn(event){
    
}