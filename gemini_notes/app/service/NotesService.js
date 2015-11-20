(function () {
    'use strict';
    gmn.app.factory('NotesService', ['$http',
        function ($http) {
            var notesServiceFactory = {};

            var notes = [
                {id:'1', title: 'note1'},
                {id:'1', title: 'note2'},
                {id:'1', title: 'note3'},
                {id:'1', title: 'note4'}
            ];

            notesServiceFactory.getNotes = function () {
                return notes;
            };

            notesServiceFactory.displayDetail = function (id) {
                return {};
            };

            notesServiceFactory.editNote = function (id) {
                alert('edit ' + id);
            };

            notesServiceFactory.DeleteNote = function (id) {
                alert('delete ' + id);
            };

            notesServiceFactory.createNote = function () {
                alert('create ' + id);
            };

            return notesServiceFactory;
        }]);
})();