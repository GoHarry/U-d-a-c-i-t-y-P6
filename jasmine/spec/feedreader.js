/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test Suit: "RSS Feeds."" */
    describe('RSS Feeds', function() {
        /* This makes sure that the allFeeds variable has been defined 
         and it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Action: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds URLs are defined', function(){
            allFeeds.forEach(function(feed){
                //checking that the URL is defined
                expect(feed.url).toBeDefined();
            });
        });
        it('all feeds URLs are not empty', function(){
            allFeeds.forEach(function(feed){
                //checking that URL is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* Action: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds names are defined', function(){
            allFeeds.forEach(function(feed){
                //checking that the feed name is defined
                expect(feed.name).toBeDefined();
            });
        });
        it('all feeds names are not empty', function(){
            allFeeds.forEach(function(feed){
                //checking that feed name is not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    /* Test suite: "The menu" */
    describe('The menu', function() {
        /* Action: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu is hidden by default', function(){
            var body = $('body');
            //checking that bodyhas class "menu-hidden" - that is that menu is hidden by default
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
        /* Action: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when the menu icon is clicked', function(){
            var menuIcon = $('.menu-icon-link');
            var body = $('body');
            menuIcon.click();
            //checking that menu shows up after a click
            expect(body.hasClass("menu-hidden")).toBe(false);
            menuIcon.click();
            //checking that menu hides when clicked again
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });
    /* Test suite: "Initial Entries" */
    describe('Initial Entries', function(){
        beforeEach(function(done){
        loadFeed(0, done);
    });
        /* Action: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('there is at least one feed', function(done){
            var entry = $('.feed a').children('.entry');
            // checking if the feed has more than 0 entries
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });
    /* Test suite: "New Feed Selection"*/
    describe('New Feed Selection', function(){
        var entry,
            entryAfterChange;
        /* Action: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done){
            $('.feed').empty();
             loadFeed(3, function() {
                entry = $('.feed').html();
                loadFeed(1, function(){
                entryAfterChange = $('.feed').html();
                done();
                });
            });
    });
        it("new loadFeed changes content", function() {
            expect(entry).not.toEqual(entryAfterChange);
        });
    });
}());