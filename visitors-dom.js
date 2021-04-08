var list = document.querySelector('.nameList');
if(localStorage['peopleGreeted']) {
    namesGreeted = JSON.parse(localStorage.getItem('peopleGreeted'));
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
