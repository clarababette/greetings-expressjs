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

    function addToCount() {
        numGreeted ++;
        localStorage.setItem('countGreeted',numGreeted);
    }

    function updateNames() {
        namesGreeted[name.toLowerCase()] = 'greeted';
        localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
    }
    
    function getCount() {
       return localStorage.getItem('countGreeted');
    }

    function setName(newname) {
        name = newname.trim();
        if (namesGreeted[name.toLowerCase()] !== 'greeted') {
            addToCount();
            updateNames();
            afterHello = newNameMsg();
        } else {
            afterHello = returnNameMsg();
        }
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
        return "Hello, " + name;
    }

    function swahiliGreeting() {
        return "Jambo, " + name;
    }

    function hungarianGreeting() {
        return "Szia, " + name;
    }

    function whichLanguage(language) {
        switch(language) {
            case 'english':
                return englishGreeting();
            case 'swahili':
                return swahiliGreeting();
            case 'hungarian':
               return hungarianGreeting();
        }
    }

    function greetMeIn(nameIn,languageIn) {
        if(nameIn !== "") {
            setName(nameIn);
            return whichLanguage(languageIn);
        } 
    }

    function reset() {
        localStorage.clear();
        numGreeted = 0;
        namesGreeted = {};
    }

    return {
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