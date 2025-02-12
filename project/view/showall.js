const logoutbtn = document.getElementById('logout');
logoutbtn.addEventListener('click', Logout);
const faqlink = document.getElementById('faq');
faqlink.addEventListener('click', faqrelocate);

function delebutton(event){
    const x = event.target;
    const sel = ((x.parentElement).children[0]).children[0];
    let temp = sel.innerText;
    strcomp = temp.split('-');
    let ipfield = document.getElementById('emailfield');
    ipfield.value = strcomp[1];
    const btn = document.getElementById('dltbtn');
    btn.click();
}

function Logout(){
    document.cookie = "uid=;";
    location.reload();
}

function faqrelocate(){
    window.location.href = "http://localhost:8002/askQuestion";
}

const Resourcenav = document.getElementById('resource');
Resourcenav.addEventListener('click', resourcerelocate);

function resourcerelocate(){
    window.location.href = "http://localhost:8002/resource";
}