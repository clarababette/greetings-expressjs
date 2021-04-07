var greetings = greetEveryone();
var username = "";
var languageSelected = "";
var greetBtn = document.querySelector('.greetMe');
var resetBtn = document.querySelector('.reset');
var greetMsg = document.querySelector('.greeting');
var nextMsg = document.querySelector('.joined');
var fullMsg = document.querySelector('.message');
var alreadyGreeted = document.querySelector('.alreadyGreeted');
var list = document.querySelector('.nameList');
var tableSect = document.querySelector('.weveGreeted');



if (localStorage['countGreeted']) {
    numGreeted = Number(localStorage['countGreeted']);
}

if(localStorage['peopleGreeted']) {
    namesGreeted = JSON.parse(localStorage.getItem('peopleGreeted'));
}

alreadyGreeted.innerHTML = greetings.beforeGreet();


if(localStorage['peopleGreeted']) {
    tableSect.classList.remove("hidden");
}

for (var x in namesGreeted) {
    let nameLi = document.createElement("LI");
    let nameMore = document.createElement("P");
    nameMore.innerHTML = greetInfo(namesGreeted[x]);
    nameLi.innerHTML = namesGreeted[x][0];
    nameLi.appendChild(nameMore);
    list.appendChild(nameLi);
    nameLi.classList.add(x);
    nameMore.classList.add('hidden')
    nameLi.addEventListener('click', function() {
        this.classList.toggle('more');
        this.children[0].classList.toggle('hidden');
    });
}

greetBtn.addEventListener('click', function() {
    username = document.querySelector('.name').value;
    var notLetter = /[^A-z]/g;
    
    try {
        if(notLetter.test(username.trim())) throw "Enter a name that only contains letters.";
        if(username == "") throw "Please enter your name.";
        if(document.querySelector(".language:checked") === null) throw "Please select a language.";
    }
    
    catch(err) {
        alert(err);
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
        alreadyGreeted.innerHTML = greetings.beforeGreet();
        if (document.querySelector('.weveGreeted').classList.contains("hidden")) {
            document.querySelector('.weveGreeted').classList.remove("hidden");
    
        }
        localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreeted',numGreeted);

        var cellData = greetings.cellValues();
        
        if (greetings.isNew()) {
            let nameLi = document.createElement("LI");
            let nameMore = document.createElement("P");
            nameLi.innerHTML = cellData[0];
            nameMore.innerHTML = greetInfo(cellData);
            nameMore.classList.add('hidden');
            nameLi.appendChild(nameMore);
            list.appendChild(nameLi);
            nameLi.classList.add(username.toLowerCase());
            nameLi.addEventListener('click', function() {
                this.classList.toggle('more');
                this.children[0].classList.toggle('hidden');
            });
        } else {
            document.querySelector('.' + username.toLowerCase()).children[0].innerHTML = greetInfo(cellData);
        }
        



});


function greetInfo(nameInfo) {
    function langInfo(num,lang) {
        switch(num) {
            case 0:
                return "We have not yet greeted " + nameInfo[0] + " in " + lang + ".";
            case 1:
                return "We have greeted " + nameInfo[0] + " once in " + lang + ".";
            case 2:
                return "We have greeted " + nameInfo[0] + " twice in " + lang + ".";
            default:
                return "We have greeted " + nameInfo[0] + " in " + lang + " " + num + " times.";
        }
    }
    return langInfo(nameInfo[1],"English") + " " + langInfo(nameInfo[2],"Kiswahili") + " " + langInfo(nameInfo[3],"Hungarian");
}

resetBtn.addEventListener('click', function() {
    greetings.reset();
    alreadyGreeted.innerHTML = "Go ahead; enter your name to be the first one greeted!";
    if (alreadyGreeted.classList.contains("hidden")) {
        alreadyGreeted.classList.remove("hidden");
        fullMsg.classList.add("hidden");
        }
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    if (!document.querySelector('.weveGreeted').classList.contains("hidden")) {
        document.querySelector('.weveGreeted').classList.add("hidden");

    }
});


