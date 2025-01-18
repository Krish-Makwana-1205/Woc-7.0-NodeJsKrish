const emailnav = document.getElementById('email');
emailnav.addEventListener('click', emailrelocate);

function emailrelocate(){
    console.log("I run");
    window.location.href = "http://localhost:8002/email";
}

const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', Logout);

function Logout(){
    document.cookie = "uid=;";
    location.reload();
}

const faqlink = document.getElementById('faq');
faqlink.addEventListener('click', faqrelocate);

function faqrelocate(){
    window.location.href = "http://localhost:8002/askQuestion";
}

