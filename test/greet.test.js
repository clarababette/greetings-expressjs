

if (localStorage['countGreetedTest']) {
    numGreeted = Number(localStorage['countGreetedTest']);
}

if(localStorage['peopleGreetedTest']) {
    namesGreeted = JSON.parse(localStorage.getItem('peopleGreetedTest'));
}


describe("The greetings factory function", function(){
    it("should retain the count after refreshing", function(){
        assert.equal(numGreeted,3);
    });
    it("should be able to reset the count", function(){
        let greeting = greetEveryone();
        greeting.reset();
        assert.equal(localStorage['countGreetedTest'],null);
    });
    it("should be able to greet someone in English", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara ');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(greeting.englishGreeting(),"Hello, Clara");
        greeting.setName('Lizzy');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(greeting.englishGreeting(),"Hello, Lizzy");
    });
    it("should be able to greet someone in Kiswahili", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(greeting.swahiliGreeting(),"Jambo, Clara");
        greeting.setName('Lizzy');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(greeting.swahiliGreeting(),"Jambo, Lizzy");
    });
    it("should be able to greet someone in Hungarian", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(greeting.hungarianGreeting(),"Szia, Clara");
        greeting.setName('Lizzy');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(greeting.hungarianGreeting(),"Szia, Lizzy");
    });
    it("should be able to greet someone in the language of their choosing", function() {
        let greeting = greetEveryone();
        assert.equal(greeting.greetMeIn('Clara','hungarian'),"Szia, Clara");
        assert.equal(greeting.greetMeIn('Lizzy','swahili'),"Jambo, Lizzy");
        assert.equal(greeting.greetMeIn('Lizzy','english'),"Hello, Lizzy");
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
    });

    it("should be able to count each person greeted only once", function() {
        let greeting = greetEveryone();
        greeting.greetMeIn('Andrew', 'Hungarian');
        localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
        localStorage.setItem('countGreetedTest',numGreeted);
        assert.equal(numGreeted,3);

    });
});
