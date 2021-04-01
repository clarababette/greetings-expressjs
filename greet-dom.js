var greetings = greetEveryone();
var username = "";
var languageSelected = "";
var greetBtn = document.querySelector('.greetMe');
var resetBtn = document.querySelector('.reset');
var greetMsg = document.querySelector('.greeting');
var nextMsg = document.querySelector('.joined');
var fullMsg = document.querySelector('.message');
var alreadyGreeted = document.querySelector('.alreadyGreeted');
var table = document.querySelector('.nametable');
var tableSect = document.querySelector('.weveGreeted');

alreadyGreeted.innerHTML = greetings.beforeGreet();


if(localStorage['peopleGreeted']) {
    tableSect.classList.remove("hidden");
}

for (var x in namesGreeted) {
    table.insertRow(1);
        table.rows[1].classList.add(x);
        table.rows[1].insertCell(0);
        table.rows[1].insertCell(1);
        table.rows[1].insertCell(2);
        table.rows[1].insertCell(3);
        table.rows[1].cells[0].innerHTML = namesGreeted[x][0];
        table.rows[1].cells[1].innerHTML = namesGreeted[x][1];
        table.rows[1].cells[2].innerHTML = namesGreeted[x][2];
        table.rows[1].cells[3].innerHTML = namesGreeted[x][3];
}

greetBtn.addEventListener('click', function() {
    username = document.querySelector('.name').value;
    languageSelected = document.querySelector(".language:checked").value;
    var notLetter = /[^A-z]/g;
    
    
    

    if (username !== "") {
        
        try {
            if(notLetter.test(username.trim())) throw "Enter a name that only contains letters.";
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
    } else {
        if (alreadyGreeted.classList.contains("hidden")) {
        alreadyGreeted.classList.remove("hidden");
        fullMsg.classList.add("hidden");
        }
    }

    var cellData = greetings.cellValues();

    if (greetings.isNew()) {
        table.insertRow(1);
        table.rows[1].classList.add(username.toLowerCase());
        table.rows[1].insertCell(0);
        table.rows[1].insertCell(1);
        table.rows[1].insertCell(2);
        table.rows[1].insertCell(3);
        table.rows[1].cells[0].innerHTML = cellData[0];
        table.rows[1].cells[1].innerHTML = cellData[1];
        table.rows[1].cells[2].innerHTML = cellData[2];
        table.rows[1].cells[3].innerHTML = cellData[3];
    }
    else {
        for (i=1; i < table.rows.length; i++) {
            if(table.rows[i].classList.contains(username.toLowerCase())) {
                table.rows[i].cells[1].innerHTML = cellData[1];
                table.rows[i].cells[2].innerHTML = cellData[2];
                table.rows[i].cells[3].innerHTML = cellData[3];
            }
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
    for (i=table.rows.length-1; i > 0; i--) {
        table.deleteRow(i);
     }
    if (!document.querySelector('.weveGreeted').classList.contains("hidden")) {
        document.querySelector('.weveGreeted').classList.add("hidden");

    }
});


