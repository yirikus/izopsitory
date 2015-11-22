//started at 19.30 - 1.15
//20.30 - 00.30
//18.50 -
(function(){
    'use strict';
    gmn.app.controller('NotesController', ['NotesService', '$state', '$stateParams', '$log',
        function(NotesService, $state, $stateParams, $log){
            this.formdata = {};
            this.stateParams = $stateParams;

            var notesCache = [];

            function init() {
                //init note list cache
                NotesService.getNotes().success(function(data){
                    $log.debug('notes cached filled from server:' + JSON.stringify(data));
                    notesCache = data;
                });
            }

            /**
             * Loads notes from cache
             * @returns {Array} list of notes
             */
            this.getNotes = function() {
                return notesCache;
            };

            this.displayDetail = function() {
                NotesService.displayDetail();
            };

            this.deleteNote = function() {
                NotesService.deleteNote();
            };

            this.createNote = function() {
                NotesService.createNote();
            };

            this.switchLanguage = function() {

            };

            this.showEdit = function(noteId) {
                this.formdata.newTitle = 'x';
                $state.go('notes.edit',{'id': noteId});
            };

            this.submitNoteChange = function() {
                NotesService.editNote(this.stateParams.id,
                                      this.formdata.newTitle );
                $state.go('^');
            };

            init();

    }]);
})();