//started at 19.30 - 1.15
//20.30 -
(function(){
    'use strict';
    gmn.app.controller('NotesController', ['NotesService', '$state', '$stateParams',
        function(NotesService, $state, $stateParams){
            this.formdata = {};
            this.stateParams = $stateParams;

            this.getNotes = function() {
                return NotesService.getNotes();
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
            }

    }]);
})();