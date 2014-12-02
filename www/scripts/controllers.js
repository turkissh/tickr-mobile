'use strict';
//angular.module('Tickr.controllers', [])
Tickr

.controller('IntroCtrl', function($scope, $rootScope, $state , $http) {


  var logout = function(){
    $.get("http://tickr-app.herokuapp.com/api/auth/logout",function(data){

      if(data.status == 0){
        alert("loged out!");
      };
    });

  };

  var getUserData = function() {
    $.get("http://tickr-app.herokuapp.com/api/auth/userId",function(data){

       if(data.userId){
          $rootScope.userId = data.userId;
          //Ones gets the userId, find the user Info!
          getUserInfo();
      }else{
        alert("Error login, contact developers");
      }
    });

  };

  var getUserInfo = function() {

    var url = "http://tickr-app.herokuapp.com/api/user/info?userId=" + $rootScope.userId;

    $.get(url,function(res){

      if(res.userId){
        $rootScope.userName = res.userName;
        $rootScope.userPhoto = res.userPhoto;
        $rootScope.userInfo = res.info;
      }else{
        alert("Error login, contact developers");
      }
    });
  };


  // Called to navigate to the main app
  var checkSession = function() {

    $.get("http://tickr-app.herokuapp.com/api/auth/hasSession",function(data){
        
        if(data.status == 0){
          if(!$rootScope.userId){
            alert("There isnt userId");
            getUserData();
          }  
          $state.go('main');
        }else{
          $state.go('intro');
        }
    });

  };

  checkSession();

})

.controller('MainCtrl',  function(TicksService, $scope, $rootScope, $ionicSideMenuDelegate, $state) {

  $scope.clickTick = function(){

    var clicked = TicksService.click();

    if( clicked == false ){
      startTick();
    }else{
      sendTick();
    }

  };

  var startTick = function() {
 
    $scope.tickStatus = TicksService.send();

    $('#text').text('Click again on green!');
    $('.main').animate({'background-color':'#4AD39C'},3000);

  };

  var sendTick = function() {
      
      function checkFlag() {
          if($rootScope.returnTick != 0) {
             window.setTimeout(checkFlag, 2000); /* this checks the flag every 100 milliseconds*/
          }
      }

      checkFlag();

  }
})

.controller('Ticks', function(TicksService,$scope,$rootScope,$state){



  

});
