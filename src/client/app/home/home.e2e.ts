describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/home');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'inClock - Time Management from @b3kN';
    expect(subject).toEqual(result);
  });

});
