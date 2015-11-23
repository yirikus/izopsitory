//GeminiNotes namespace
var gmn = {};
(function(){
    'use strict';
    gmn.app = angular.module('gmn',['ui.router', 'pascalprecht.translate']);
    gmn.app.config(['$stateProvider', '$urlRouterProvider', '$translateProvider',
        function ($stateProvider,   $urlRouterProvider, $translateProvider) {

            // load translations
            $translateProvider.useStaticFilesLoader({
                prefix: 'languages/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            //set up routing
            $urlRouterProvider.otherwise('/');

            $stateProvider.state('notes', {
                url: '/',
                templateUrl: 'templates/notes.html',
                controller: 'NotesController',
                controllerAs: 'notes'
            });

            $stateProvider.state('notes.edit', {
                url: 'edit/{id}',
                templateUrl: 'templates/noteEdit.html'
            });

            $stateProvider.state('notes.detail', {
                url: 'detail/{id}',
                params: {title:null},
                templateUrl: 'templates/noteDetail.html'
            });

            $stateProvider.state('notes.add', {
                url: 'add/',
                templateUrl: 'templates/noteAdd.html'
            });
        }]);

    /**
     * Global utility functions
     */
    gmn.util = {
        isDefined: function(value) {
            return value !== null && value !== '' && value !== undefined;
        }
    };

})();