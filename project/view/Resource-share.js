const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', Logout);
const faqlink = document.getElementById('faq');
faqlink.addEventListener('click', faqrelocate);
const emailnav = document.getElementById('email');
emailnav.addEventListener('click', emailrelocate);

function emailrelocate(){
    window.location.href = "http://localhost:8002/email";
}
function Logout(){
    document.cookie = "uid=;";
    location.reload();
}
function faqrelocate(){
    window.location.href = "http://localhost:8002/askQuestion";
}
