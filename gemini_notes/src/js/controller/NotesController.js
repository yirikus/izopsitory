(function(){
    'use strict';
    gmn.app.controller('NotesController', ['NotesService', '$state', '$stateParams', '$log', '$translate',
        function(NotesService, $state, $stateParams, $log, $translate){
            //object to store data user typed to a form
            this.formdata = {language: $translate.use()};
            this.stateParams = $stateParams;
            var notesCache = [];
            this.languageCodelist = [
                {id:'en', label: $translate.instant('en')},
                {id:'cz', label: $translate.instant('cz')},
                {id:'ru', label: $translate.instant('ru')}];

            $log.debug('using language ' + $translate.use());

            function init() {
                //init note list cache
                //we suppose no other users are able to modify notes,
                // so we request list of all notes just on load
                NotesService.getNotes().success(function(data){
                    $log.debug('notes cache filled from server:' + JSON.stringify(data));
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

            this.changeLanguage = function() {
                $translate.use(this.formdata.language);
                $log.debug('using language ' + $translate.use());
            };

            /**
             * how edit template
             * @param noteId
             */
            this.showEdit = function(noteId) {
                this.formdata.noteTitle = findNoteInCache(noteId).title;
                $state.go('notes.edit',{'id': noteId, 'title': this.formdata.noteTitle});
            };

            /**
             * Show detail template
             * @param noteId
             */
            this.showDetail = function(noteId) {
                $state.go('notes.detail',{'id': noteId, 'title': findNoteInCache(noteId).title});
            };

            /**
             * Show template for addition
             * @param noteId
             */
            this.showAdd = function(noteId) {
                this.formdata.noteTitle = undefined;
                $state.go('notes.add');
            };

            this.deleteNote = function(noteId) {
                NotesService.deleteNote(noteId);
                deleteFromCache(noteId);
            };

            this.createNewNote = function(title) {
                NotesService.createNote(title).success(function(data) {
                    notesCache.push(data);
                });
                this.goBack();
            };


            this.submitNoteChange = function(id, title) {
                NotesService.editNote(id, title);
                //update note in cache so we do not have to reload the list
                findNoteInCache(id).title = title;
                this.goBack();
            };

            this.goBack = function(){
                $state.go('^');
            };

            /**
             * Deletes note with given id from notes cache. If id is not found, does nothing
             */
            function deleteFromCache(id) {
                for (var i = 0; i < notesCache.length; i++) {
                    notesCache.splice(i,1);
                }
            }

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