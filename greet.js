var numGreeted = 0;


if (localStorage['countGreeted']) {
    numGreeted = Number(localStorage['countGreeted']);
}

function greetEveryone() {
    var name = "";
    var namesGreeted = {};

    function addToCount() {
        numGreeted ++;
        localStorage.setItem('countGreeted',numGreeted);
        console.log(numGreeted);

    }
    
    function getCount() {
       return localStorage.getItem('countGreeted');
    }

    function setName(newname) {
        name = newname.trim();
    }

    function addToNameList() {
        
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

    function reset() {
        localStorage.clear();
        numGreeted = 0;
    }

    return {
        addToCount,
        addToNameList,
        getCount,
        setName,
        englishGreeting,
        swahiliGreeting,
        hungarianGreeting,
        whichLanguage,
        reset
    }
}