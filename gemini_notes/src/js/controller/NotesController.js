//started at 19.30 - 1.15
(function(){
    'use strict';
    gmn.app.controller('NotesController', ['NotesService', '$state',
        function(NotesService, $state){
            this.formdata = {};
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
                $state.go('notes.edit',{'noteId': noteId});
            };

            this.submitNoteChange = function() {
                NotesService.editNote(this.formdata.noteName,
                                      this.formdata.noteText );
                this.formdata.editShown = false;
            }

    }]);
})();