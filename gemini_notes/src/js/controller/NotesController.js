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
                //we suppose no other users are able to modify notes,
                // so we request list of all notes just on load
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
                this.formdata.newTitle = findNoteInCache(noteId).title;
                $state.go('notes.edit',{'id': noteId});
            };

            this.submitNoteChange = function() {
                NotesService.editNote(this.stateParams.id,
                                      this.formdata.newTitle );
                //update note in cache so we do not have to reload the list
                findNoteInCache(this.stateParams.id).title = this.formdata.newTitle;
                $state.go('^');
            };

            /**
             * Finds note with given id in note cache
             */
            function findNoteInCache(id){
                for (var i = 0; i < notesCache.length; i++) {
                    if (notesCache[i].id == id) {
                        return notesCache[i];
                    }
                }
                return null;
            }

            init();

    }]);
})();