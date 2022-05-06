const navOpenBTN = document.querySelector("#hamburger-open")
const navCloseBTN = document.querySelector("#hamburger-close")

const nav = document.querySelector("nav");

function openNav(){
    nav.style.display = "block";
    navOpenBTN.style.display ="none";
}
function closeNav(){
    nav.style.display = "none";
    navOpenBTN.style.display ="block";
} 

navOpenBTN.addEventListener("click", openNav);
navCloseBTN.addEventListener("click", closeNav);