(function(){
    'use strict';

    describe('test server accessibility', function() {
        beforeEach(function () {
            browser.get('index.html');
        });

        it('should automatically redirect to / when location hash is empty', function() {
            expect(browser.getLocationAbsUrl()).toMatch("/");
        });

        it('should have a heading', function() {
            element(by.css('#gmn-header-title')).getText().then(function(name) {
                expect(name).toBe('Gemini Notes');
            });
        });

        it('should change application title if different language is selected', function() {
            element(by.cssContainingText('#languageSelector option', '\u010Ce\u0161tina')).click();
            element(by.css('#gmn-header-title')).getText().then(function(name) {
                expect(name).toBe('Gemini Pozn\u00E1mky');
            });
        });

        it('should display 2 notes that were obtained from mock WS', function() {
            expect(element.all(by.css('.gmn-note')).count()).toEqual(2);
        });

        it('should display 3 notes after one was added', function() {
            element(by.css('#createNoteButton')).click();
            element(by.css('#noteTitleArea')).sendKeys("123456789");
            element(by.css('#submitNewNote')).click();
            expect(element.all(by.css('.gmn-note')).count()).toEqual(3);
        });
    });


})();