(function () {
    'use strict';
    gmn.app.factory('NotesService', ['$http', '$log',
        function ($http, $log) {
            var notesServiceFactory = {};

            /**
             * Calls service to obtain notes
             * @returns {*} promise
             */
            notesServiceFactory.getNotes = function () {
                $log.debug('Sending "getNotes" request to server ');
                return $http({
                    'method':'GET',
                    'url': 'api/notes'})
                    .success(function(data){
                        //default success method
                        console.log(JSON.stringify(data));
                    });
            };

            notesServiceFactory.displayDetail = function (id) {
                return {};
            };

            /**
             * Sends request to WS to edit note with given id
             * @param id id of note to edit
             * @param title new title of note
             * @returns {*} promise
             */
            notesServiceFactory.editNote = function (id, title) {
                if (!gmn.util.isDefined(id)) {
                    throw new Error('Missing id');
                }
                $log.debug('Sending "editNote(' + id + ', ' + title + ')" request to server ');
                return $http({'method':'PUT',
                              'content-type': 'application/json',
                              'url': 'api/notes/' + encodeURIComponent(id),
                              'data': {'title' : encodeURIComponent(title)}})
                    .success(function(data){
                        //default success method
                        console.log(JSON.stringify(data));
                    });
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