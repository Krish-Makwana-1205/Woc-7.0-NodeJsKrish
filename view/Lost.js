const emailnav = document.getElementById('email');
emailnav.addEventListener('click', emailrelocate);

function emailrelocate(){
    window.location.href = "http://localhost:8002/email";
}

const Resourcenav = document.getElementById('resource');
Resourcenav.addEventListener('click', resourcerelocate);

function resourcerelocate(){
    window.location.href = "http://localhost:8002/resource";
}

const faq = document.getElementById('faq');
faq.addEventListener('click', faqrelocate);

function faqrelocate(){
    window.location.href = "http://localhost:8002/askQuestion";
}

const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', Logout);
function Logout(){
    document.cookie = "uid=;";
    location.reload();
}

