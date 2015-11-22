(function () {
    'use strict';
    gmn.app.factory('NotesService', ['$http', '$log',
        function ($http, $log) {
            var notesServiceFactory = {};

            /**
             * Convenience method to call server
             * @param {}name name of the call for logging puposes
             * @param method HTTP method
             * @param [id] id of note
             * @param [title] title of note
             * @returns {*} promise
             */
            function ajaxCall(name, method, id, title) {
                $log.debug('Sending "' + name + '(' + id + ', ' + title + ')" request to server ');
                var postData = title ? {'title' : encodeURIComponent(title)} : undefined;
                var urlParam = id ? '/' + encodeURIComponent(id) : '';
                return $http({'method':method,
                    'content-type': 'application/json',
                    'url': 'api/notes' + urlParam,
                    'data': postData})
                    .success(function(data){
                        //default success method
                        console.debug(name + ' response:' + JSON.stringify(data));
                    }).error(function(res){
                        console.error(name + ' error:' + JSON.stringify(res));
                    });
            }

            /**
             * Calls service to obtain notes
             * @returns {*} promise
             */
            notesServiceFactory.getNotes = function () {
                return ajaxCall('getNotes', 'GET');
            };

            /**
             * Sends request to WS to get details of one note
             * @param id id of requested note
             * @returns {*} promise
             */
            notesServiceFactory.getNote = function (id) {
                if (!gmn.util.isDefined(id)) {
                    throw new Error('Missing id');
                }
                return ajaxCall('getNote', 'GET', id);
            };

            /**
             * Sends request to WS to edit note with given id
             * @param id id of note to edit
             * @param title new title of note
             * @returns {*} promise
             */
            notesServiceFactory.editNote = function (id, title) {
                if (!gmn.util.isDefined(id) || !gmn.util.isDefined(title)) {
                    throw new Error('Missing id or title');
                }
                return ajaxCall('editNote', 'PUT', id, title);
            };

            /**
             * Sends request to WS to delete a note with given id
             * @param id of note to delete
             * @returns {*} promise
             */
            notesServiceFactory.deleteNote = function (id) {
                if (!gmn.util.isDefined(id)) {
                    throw new Error('Missing id');
                }
                return ajaxCall('deleteNote', 'DELETE', id);
            };

            /**
             * Sends request to WS to create a note with given title
             * @param title title of new note
             * @returns {*} promise
             */
            notesServiceFactory.createNote = function (title) {
                if (!gmn.util.isDefined(title)) {
                    throw new Error('Missing title');
                }
                return ajaxCall('createNote', 'POST',null, title);
            };

            return notesServiceFactory;
        }]);
})();