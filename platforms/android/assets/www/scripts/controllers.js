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

    var data = Object();
    data.userId = $rootScope.userId;

    alert("Calling info for " + data.userId);

    $.get("http://tickr-app.herokuapp.com/api/user/info",data,function(res){

      alert("Response from info");
      alert(res.userName);

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
    
    alert("checking session");

    $.get("http://tickr-app.herokuapp.com/api/auth/hasSession",function(data){
        
        alert("Return from hasSession");

        if(data.status == 0){
          alert("All ok");
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

    alert($rootScope.userName);

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
          } else {
            alert("Tick sent");
          }
      }

      checkFlag();

  }
})

.controller('Ticks', function(TicksService,$scope,$rootScope,$state){



  

});
