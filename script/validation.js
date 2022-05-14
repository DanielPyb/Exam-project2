const formGroup = document.querySelector(".formgroup")

const contactForm = document.querySelector(".contact-form");
const caller = document.querySelector("#name")
const titleMessage = document.querySelector("#title")
const email = document.querySelector("#contact-email")
const message = document.querySelector("#message")

const nameError = document.querySelector("#name-error");
const titleError = document.querySelector("#title-error")
const messageError = document.querySelector("#message-error");
const contactSuccess = document.querySelector("contact-success");
const emailError = document.querySelector("#email-error")

function emailValidation(email){
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/; // copied from https://digitalfortress.tech/tips/top-15-commonly-used-regex/ at step 3 "common Email ID's"
    const emailMatch = emailPattern.test(email)
    return emailMatch;
}


function sendMessage(e){
    e.preventDefault();
    let counter = 0;
    if (titleMessage.value.trim().length > 0){
        titleError.style.display = "none";
        counter ++;
    } else{
        titleError.style.display = "block";
    } if (message.value.trim().length > 25){
        messageError.style.display = "none";
        counter++;
    } else{
        messageError.style.display = "block";
    } if(caller.value.trim().length > 0){
        nameError.style.display = "none";
        counter++
    } else {
        nameError.style.display = "block";
    }if (emailValidation(email.value) == true && email.value.trim().length > 0){
        emailError.style.display = "none";
        counter ++
    } else{
        emailError.style.display = "block"
    }
    if (counter == 4){
        formGroup.style.display = "none";
        contactSuccess.style.display = "block";
    }
}

contactForm.addEventListener("submit", sendMessage)