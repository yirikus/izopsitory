#Gemini notes
Application that communicates with remote WS to create, retrieve, update, delete "notes". Application is supposed to run on Node.js server. 
Server uses Express js framework that is mainly used to create API for client.
Gulp and Bower is used to build the application.
Front-end is created using AngularJs, AngularUI-Router and Bootstrap with BoostrapUI wrapper. 

##Requirements
To be able to build the application you need the following:
* Node 
* Bower (`npm install -g bower`)
* Gulp (`npm install -g gulp`)
* Git
* Gem

##Build
To build the app you just run these commands after repository cloning

`npm install`

`bower install`

`gulp build`

##Running
To run a server, run:
`node server`
Server will run by default on http://localhost:9000/ 

##Running tests
If running for the first time, download selenium server:

`node node_modules/protractor/bin/webdriver-manager update` 

Make sure version 2.48.2 is downloaded otherwise seleniumServerJar property in protractor-e2e.js must be updated

Start node server with Gemini-Notes app

Run tests

`node node_modules/protractor/bin/protractor protractor-e2e.js` 
