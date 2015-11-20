//GeminiNotes namespace
var gmn = {};
(function(){
    'use strict';
    gmn.app = angular.module('gmn',['ui.router']);
    gmn.app.config(['$stateProvider', '$urlRouterProvider',function (
        $stateProvider,   $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('notes', {
                url: '/',
                templateUrl: 'templates/notes.html',
                controller: 'NotesController',
                controllerAs: 'notes'
            });

            $stateProvider.state('notes.edit', {
                url: 'edit/{id}',
                templateUrl: 'templates/editNote.html',
                controller: 'NotesController',
                controllerAs: 'contact'
            });
        }]);
})();