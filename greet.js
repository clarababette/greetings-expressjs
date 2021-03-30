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

    function addToCount() {
        numGreeted ++;
        localStorage.setItem('countGreeted',numGreeted);
        console.log(numGreeted);
    }

    function updateNames() {
        namesGreeted[name] = 'greeted';
        localStorage.setItem('peopleGreeted', JSON.stringify(namesGreeted));
        console.log(namesGreeted);
    }
    
    function getCount() {
       return localStorage.getItem('countGreeted');
    }

    function setName(newname) {
        name = newname.trim();
        if (namesGreeted[name] !== 'greeted') {
            addToCount();
            updateNames();
        }
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
        setName(nameIn);
        console.log(nameIn);
        console.log(name);
       return whichLanguage(languageIn);

    }

    function reset() {
        localStorage.clear();
        numGreeted = 0;
        namesGreeted = {};
    }

    return {
        greetMeIn,
        addToCount,
        updateNames,
        getCount,
        setName,
        englishGreeting,
        swahiliGreeting,
        hungarianGreeting,
        whichLanguage,
        reset
    }
}