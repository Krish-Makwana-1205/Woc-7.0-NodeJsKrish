const emailnav = document.getElementById('email');
emailnav.addEventListener('click', emailrelocate);

function emailrelocate(){
    window.location.href = "http://localhost:8002/email";
}