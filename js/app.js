const form = document.querySelector("form");
const divLoading = document.getElementById("loading");
const divCappie = document.getElementById("cappieDiv")
const name = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("number");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Call the function to get a random number between 1 and 10
let randomNumber1 = randomNummer(1, 9);
let randomNumber2 = randomNummer(1,9);

divCappie.innerHTML = '<label For="cappie">Controlevraag: Wat is ' + randomNumber1 +'+' + randomNumber2 + ' </label> <input class="info_input" type="text" name="cappie" id="cappie" required/>';
const cappie = document.getElementById("cappie")


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
        return;
    }
    divLoading.innerHTML = '<i class="fas fa-spinner fa-spin contact-content__loading"></i>';

    let response = await fetch('https://localhost:7254/api/Mail', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            number: number.value,
            subject: subject.value,
            message: message.value
        })
    }).then(response => {
        alert("Gelukt");
        divLoading.innerHTML = "";
        form.reset()
    }).catch(response => {
        alert("Mislukt")
        divLoading.innerHTML = "";
        form.reset()
    })
});

function randomNummer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






