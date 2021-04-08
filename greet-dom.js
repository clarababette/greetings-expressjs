var greetings = greetEveryone();
var username = "";
var languageSelected = "";
var greetBtn = document.querySelector('.greetMe');
var resetBtn = document.querySelector('.reset');
var greetMsg = document.querySelector('.greeting');
var nextMsg = document.querySelector('.joined');
var fullMsg = document.querySelector('.message');
var alreadyGreeted = document.querySelector('.alreadyGreeted');
var visitorsLink = document.querySelector('.visitors-link');



if (localStorage['countGreeted']) {
    numGreeted = Number(localStorage['countGreeted']);
}

if(localStorage['peopleGreeted']) {
    namesGreeted = JSON.parse(localStorage.getItem('peopleGreeted'));
}

alreadyGreeted.innerHTML = greetings.beforeGreet();


if(localStorage['peopleGreeted']) {
    visitorsLink.classList.remove("hidden");
}

greetBtn.addEventListener('click', function() {
    if (alreadyGreeted.classList.contains("error")) {
        alreadyGreeted.classList.remove("error");
    }
    username = document.querySelector('.name').value;
    var notLetter = /[^A-z]/g;
    
    try {
        if(notLetter.test(username.trim())) throw "Enter a name that only contains letters.";
        if(username == "") throw "Please enter your name.";
        if(document.querySelector(".language:checked") === null) throw "Please select a language.";
    }
    
    catch(err) {
        alreadyGreeted.innerHTML = err;
        alreadyGreeted.classList.add("error");
        if (alreadyGreeted.classList.contains("hidden")) {
            alreadyGreeted.classList.remove("hidden");
            fullMsg.classList.add("hidden");
        }
        document.querySelector('.name').value = "";
        return;
    }
    languageSelected = document.querySelector(".language:checked").value;
    


        greetMsg.innerHTML = greetings.greetMeIn(username,languageSelected);
        nextMsg.innerHTML = greetings.additionalMsg();
        if (fullMsg.classList.contains("hidden")) {
            alreadyGreeted.classList.add("hidden");
            fullMsg.classList.remove("hidden");
            }
        document.querySelector('.name').value = "";
        document.querySelector(".language:checked").checked = false;

        alreadyGreeted.innerHTML = greetings.beforeGreet();
        localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreeted',numGreeted);
        if (visitorsLink.classList.contains("hidden")) {
            visitorsLink.classList.remove("hidden");
            }

    


});

resetBtn.addEventListener('click', function() {
    greetings.reset();
    alreadyGreeted.innerHTML = "Go ahead; enter your name to be the first one greeted!";
    if (alreadyGreeted.classList.contains("hidden")) {
        alreadyGreeted.classList.remove("hidden");
        fullMsg.classList.add("hidden");
        }
        if (!visitorsLink.classList.contains("hidden")) {
            visitorsLink.classList.add("hidden");
            }
        
});


