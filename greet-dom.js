var greetings = greetEveryone();
var username = "";
var languageSelected = "";
var greetBtn = document.querySelector('.greetMe');
var resetBtn = document.querySelector('.reset');
var greetMsg = document.querySelector('.greeting');
var nextMsg = document.querySelector('.joined');
var fullMsg = document.querySelector('.message');
var alreadyGreeted = document.querySelector('.alreadyGreeted');
alreadyGreeted.innerHTML = greetings.beforeGreet();

greetBtn.addEventListener('click', function() {
    username = document.querySelector('.name').value;
    languageSelected = document.querySelector(".language:checked").value;
    if (username !== "") {
        greetMsg.innerHTML = greetings.greetMeIn(username,languageSelected);
        nextMsg.innerHTML = greetings.additionalMsg();
        if (fullMsg.classList.contains("hidden")) {
            alreadyGreeted.classList.add("hidden");
            fullMsg.classList.remove("hidden");
            }
        document.querySelector('.name').value = "";
        alreadyGreeted.innerHTML = greetings.beforeGreet();
    } else {
        if (alreadyGreeted.classList.contains("hidden")) {
        alreadyGreeted.classList.remove("hidden");
        fullMsg.classList.add("hidden");
        }
        
    }
});

resetBtn.addEventListener('click', function() {
    greetings.reset();
    alreadyGreeted.innerHTML = "Go ahead; enter your name to be the first one greeted!";
    if (alreadyGreeted.classList.contains("hidden")) {
        alreadyGreeted.classList.remove("hidden");
        fullMsg.classList.add("hidden");
        }
});


