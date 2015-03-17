'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
var Tickr = angular.module('Tickr', ['ionic', 'config'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('menu',{
    url: '/menu',
    abstract:true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('menu.main', {
    url: '/main',
    views: {
      'menuContent':{
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('ticks',{
    url: '/ticks',
    templateUrl: 'templates/ticks.html',
    controller: 'Ticks'
  });

  $urlRouterProvider.otherwise('/');

});

