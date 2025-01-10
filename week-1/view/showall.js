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