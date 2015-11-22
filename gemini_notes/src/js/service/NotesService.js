(function () {
    'use strict';
    gmn.app.factory('NotesService', ['$http',
        function ($http) {
            var notesServiceFactory = {};

            /**
             * Calls service to obtain notes
             * @returns {*} promise
             */
            notesServiceFactory.getNotes = function () {
                return $http({method:'GET', url: 'api/notes'})
                    .success(function(data){
                        console.log(JSON.stringify(data));
                    });
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