const form = document.querySelector("form");
const divLoading = document.getElementById("loading");
const divCappie = document.getElementById("cappieDiv")
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const number = document.getElementById("number");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const button = document.getElementById("submitButton");

let randomNummer1;
let randomNummer2;

disableButton();
GetCaptcha();

name.addEventListener("input", (event)=>{
    validateName(true)
    validateForm();
});
surname.addEventListener("input", (event)=>{
    validateForm();
});

email.addEventListener("input", (event) => {
    validateEmail(true)
    validateForm();
});

number.addEventListener("input", (event) => {
    validateNumber(true)
    validateForm();
});

// subject.addEventListener("blur", (event)=>{
//     validateForm();
// });
// message.addEventListener("blur", (event)=>{
//     validateForm();
// });

form.addEventListener("submit", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    let nummer = randomNumber1 + randomNumber2;
    if (parseInt(cappie.value) !== nummer) {
        LoadingAlert("Captcha");
        GetCaptcha();
        return;
    }
    LoadingAlert("Loading");

    let response = await fetch('https://localhost:7254/api/Mail', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            email: email.value,
            number: number.value,
            subject: subject.value,
            message: message.value
        })
    }).then(response => {
        LoadingAlert("Succes");
        form.reset();
    }).catch(response => {
        LoadingAlert("Error");

    })
});

function randomNummer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LoadingAlert(status){
    if(status === "Error"){
        divLoading.innerHTML = '<label>' +
            ' <input type="checkbox" class="alertCheckbox" autocomplete="off" /> ' +
            '<div class="alert error"> <span class="alertClose">&nbsp;&nbsp;X</span> <span class="alertText">' +
            'Het is niet gelukt om de email te versturen!<br class="clear"/></span> ' +
            '</div> </label>';
    }
    if(status === "Succes"){
        divLoading.innerHTML = '<label> ' +
            '<input type="checkbox" class="alertCheckbox" autocomplete="off" /> ' +
            '<div class="alert success"> <span class="alertClose">&nbsp;&nbsp;X</span> <span class="alertText">' +
            'De email is succesvol verzonden!<br class="clear"/></span> ' +
            '</div> </label>';
    }
    if(status === "Captcha"){
        divLoading.innerHTML = '<label>' +
            ' <input type="checkbox" class="alertCheckbox" autocomplete="off" /> ' +
            '<div class="alert error"> <span class="alertClose">&nbsp;&nbsp;X</span> <span class="alertText">' +
            'De captcha is verkeerd ingevuld! Probeer het opniew! <br class="clear"/></span> ' +
            '</div> </label>';
    }
    if(status === "Loading"){
        divLoading.innerHTML = '<div class="spinner"></div>';
    }
}

function validateForm(){
    const validation = [
            // validateName(),
            validateEmail(),
            validateNumber()
        ];

    if(validation.includes(false)){
        disableButton();
    }
    else{
        enableButton();
    }
}
function validateEmail(displayError= false) {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errorMessage = "";
    if (!emailValue) { // Check if email is empty
        errorMessage = "Vul alsjeblieft een emailadres in.";
    } else if (!emailRegex.test(emailValue)) { // Check if email format is invalid
        errorMessage = "Email adres is incorrect";
    } else {
        email.setCustomValidity("");
        return true;
    }
    if(displayError) {
        email.setCustomValidity(errorMessage);
        email.reportValidity();
    }
    return false;
}
function validateNumber(displayError = false){
    const numberValue = number.value.trim();
    const numberRegex = /^(?:(?:\+|00)31|0)(?:6\d{8})$/;

    let errorMessage = "";
    if (!numberValue) { // Check if email is empty
        errorMessage = "Vul alsjeblieft een telefoonnummer in.";
    } else if (!numberRegex.test(numberValue)) { // Check if email format is invalid
        errorMessage = "Telefoonnummer is incorrect";
    } else {
        number.setCustomValidity("");
        return true;
    }
    if(displayError) {
        number.setCustomValidity(errorMessage);
        number.reportValidity();
    }
    return false;
}

function validateName(displayError, nameType){
    const nameValue = (nameType).value.trim();
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;

    let errorMessage = "";
    if (!nameValue) { // Check if email is empty
        errorMessage = "Vul alsjeblieft een naam in.";
    } else if (!nameRegex.test(nameValue)) { // Check if email format is invalid
        errorMessage = "Naam is incorrect";
    } else {
        (nameType).setCustomValidity("");
        return true;
    }
    if(displayError) {
        (nameType).setCustomValidity(errorMessage);
        (nameType).reportValidity();
    }
    return false;
}

function disableButton(){
    button.setAttribute("disabled", "");
}
function enableButton(){
    button.removeAttribute("disabled");
}

function GetCaptcha(){
    randomNumber1 = randomNummer(1,4);
    randomNumber2 = randomNummer(1,4);

    divCappie.innerHTML = '<label For="cappie">Controlevraag: Wat is ' + randomNumber1 +'+' + randomNumber2 + ' </label> <input class="info_input" type="text" name="cappie" id="cappie" required/>';
    const cappie = document.getElementById("cappie")
}






