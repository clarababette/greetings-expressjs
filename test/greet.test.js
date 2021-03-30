describe("The greetings factory function", function(){
    it("should be able to greet someone in English", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara ');
        assert.equal(greeting.englishGreeting(),"Hello, Clara");
        greeting.setName('Lizzy');
        assert.equal(greeting.englishGreeting(),"Hello, Lizzy");
    });
    it("should be able to greet someone in Kiswahili", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara');
        assert.equal(greeting.swahiliGreeting(),"Jambo, Clara");
        greeting.setName('Lizzy');
        assert.equal(greeting.swahiliGreeting(),"Jambo, Lizzy");
    });
    it("should be able to greet someone in Hungarian", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara');
        assert.equal(greeting.hungarianGreeting(),"Szia, Clara");
        greeting.setName('Lizzy');
        assert.equal(greeting.hungarianGreeting(),"Szia, Lizzy");
    });
    it("should be able to greet someone in the language of their choosing", function() {
        let greeting = greetEveryone();
        greeting.setName('Clara');
        assert.equal(greeting.whichLanguage('hungarian'),"Szia, Clara");
        greeting.setName('Lizzy');
        assert.equal(greeting.whichLanguage('swahili'),"Jambo, Lizzy");
        assert.equal(greeting.whichLanguage('english'),"Hello, Lizzy");
    });

    it("should be able to count", function() {
        let greeting = greetEveryone();
        greeting.addToCount();
        greeting.addToCount();
        assert.equal(greeting.getCount(),2);

    });



    

});
