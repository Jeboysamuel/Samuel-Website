const form = document.querySelector("form");
const divLoading = document.getElementById("loading");
const divCappie = document.getElementById("cappieDiv")
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const number = document.getElementById("number");
const subject = document.getElementById("subject");
const message = document.getElementById("message");


let randomNummer1;
let randomNummer2;

GetCaptcha();

email.addEventListener("input", (event) => {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("Voer een geldig email in!");
        email.reportValidity();
    } else {
        email.setCustomValidity("");
    }
});

number.addEventListener("input", (event) => {
    if (number.validity.patternMismatch) {
        number.setCustomValidity("Voer een geldig nummer in!");
        number.reportValidity();
    } else {
        number.setCustomValidity("");
    }
});

form.addEventListener("submit", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
        // If it isn't, we display an appropriate error message
        return;
    }
    if (!number.validity.valid) {
        return;
    }
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

function GetCaptcha(){
    randomNumber1 = randomNummer(1,4);
    randomNumber2 = randomNummer(1,4);

    divCappie.innerHTML = '<label For="cappie">Controlevraag: Wat is ' + randomNumber1 +'+' + randomNumber2 + ' </label> <input class="info_input" type="text" name="cappie" id="cappie" required/>';
    const cappie = document.getElementById("cappie")
}






