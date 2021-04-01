var numGreeted = 0;
var namesGreeted = {};


if (localStorage['countGreeted']) {
    numGreeted = Number(localStorage['countGreeted']);
}

if(localStorage['peopleGreeted']) {
    namesGreeted = JSON.parse(localStorage.getItem('peopleGreeted'));
}


function greetEveryone() {
    var name = "";
    var afterHello = "";
    var newUser = false;

    function addToCount() {
        numGreeted ++;
        localStorage.setItem('countGreeted',numGreeted);
    }

    function updateNames() {
        namesGreeted[name] = [presentationName(),0,0,0];
        localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
    }

    function cellValues() {
        return namesGreeted[name];
    }
    
    function getCount() {
       return localStorage.getItem('countGreeted');
    }

    function setName(newname) {
        name = newname.trim().toLowerCase();
        if (namesGreeted[name] === undefined) {
            newUser = true;
            addToCount();
            updateNames();
            afterHello = newNameMsg();
        } else {
            afterHello = returnNameMsg();
            newUser = false;
        }
    }

    function isNew() {
        return newUser;
    }

    function presentationName() {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function beforeGreet() {
        switch(getCount()) {
            case null:
                return "Go ahead; enter your name to be the first one greeted!";
            case '1':
                return "Join the one other person to have been greeted.";
            default:
                return "Join the " + getCount() + " other people that have already been greeted!";

        }
    }

    function newNameMsg() {
        if (getCount() == 1) {
            return 'Congrats! You are the first person to be greeted.';
        }
        return 'You are now part of the ' + numGreeted + ' people that have been greeted.';
    }

    function returnNameMsg() {
        return 'Welcome back!';
    }

    function additionalMsg() {
        return afterHello;
    }

    function englishGreeting() {
        return "Hello, " + presentationName();
    }

    function swahiliGreeting() {
        return "Jambo, " + presentationName();
    }

    function hungarianGreeting() {
        return "Szia, " + presentationName();
    }

    function whichLanguage(language) {
        switch(language) {
            case 'english':
                namesGreeted[name][1] ++;
                localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
                return englishGreeting();
            case 'swahili':
                namesGreeted[name][2] ++;
                localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
                return swahiliGreeting();
            case 'hungarian':
                namesGreeted[name][3] ++;
                localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
               return hungarianGreeting();
        }
    }

    function greetMeIn(nameIn,languageIn) {

            setName(nameIn);
            return whichLanguage(languageIn);
    }

    function reset() {
        localStorage.clear();
        numGreeted = 0;
        namesGreeted = {};
    }

    return {
        isNew,
        cellValues,
        greetMeIn,
        newNameMsg,
        beforeGreet,
        returnNameMsg,
        addToCount,
        updateNames,
        getCount,
        setName,
        englishGreeting,
        swahiliGreeting,
        hungarianGreeting,
        whichLanguage,
        additionalMsg,
        reset
    }
}