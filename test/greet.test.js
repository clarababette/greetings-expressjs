describe("The greetings factory function", function(){
    it("should retain the count after refreshing", function(){
        let greeting = greetEveryone();
        assert.equal(greeting.getCount(),3);
    });
    it("should be able to reset the count", function(){
        let greeting = greetEveryone();
        greeting.reset();
        assert.equal(greeting.getCount(),null);
    });
    it("should be able to greet someone in English", function() {
        let greeting = greetEveryone();
        greeting.reset();
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
        assert.equal(greeting.greetMeIn('Clara','hungarian'),"Szia, Clara");
        assert.equal(greeting.greetMeIn('Lizzy','swahili'),"Jambo, Lizzy");
        assert.equal(greeting.greetMeIn('Lizzy','english'),"Hello, Lizzy");
    });

    it("should be able to count each person greeted only once", function() {
        let greeting = greetEveryone();
        greeting.greetMeIn('Andrew', 'Hungarian');
        assert.equal(greeting.getCount(),3);

    });



    

});
