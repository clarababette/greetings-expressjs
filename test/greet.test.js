describe('The greetings factory function', () => {
  it('should retain the count after refreshing', () => {
    assert.equal(numGreeted, 3);
  });
  it('should be able to reset the count', () => {
    const greeting = greetEveryone();
    greeting.reset();
    assert.equal(localStorage['countGreetedTest'], null);
  });
  it('should be able to greet someone in English', () => {
    const greeting = greetEveryone();
    greeting.setName('Clara ');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(greeting.englishGreeting(), 'Hello, Clara');
    greeting.setName('Lizzy');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(greeting.englishGreeting(), 'Hello, Lizzy');
  });
  it('should be able to greet someone in Kiswahili', () => {
    const greeting = greetEveryone();
    greeting.setName('Clara');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(greeting.swahiliGreeting(), 'Jambo, Clara');
    greeting.setName('Lizzy');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(greeting.swahiliGreeting(), 'Jambo, Lizzy');
  });
  it('should be able to greet someone in Hungarian', () => {
    const greeting = greetEveryone();
    greeting.setName('Clara');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(greeting.hungarianGreeting(), 'Szia, Clara');
    greeting.setName('Lizzy');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(greeting.hungarianGreeting(), 'Szia, Lizzy');
  });
  it('should greet someone in the language of their choosing', () => {
    const greeting = greetEveryone();
    assert.equal(greeting.greetMeIn('Clara', 'hungarian'), 'Szia, Clara');
    assert.equal(greeting.greetMeIn('Lizzy', 'swahili'), 'Jambo, Lizzy');
    assert.equal(greeting.greetMeIn('Lizzy', 'english'), 'Hello, Lizzy');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
  });

  it('should be able to count each person greeted only once', () => {
    const greeting = greetEveryone();
    greeting.greetMeIn('Andrew', 'Hungarian');
    localStorage.setItem('peopleGreetedTest', JSON.stringify(namesGreeted));
    localStorage.setItem('countGreetedTest', numGreeted);
    assert.equal(numGreeted, 3);
  });
});
