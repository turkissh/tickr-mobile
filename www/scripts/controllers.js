'use strict';
//angular.module('Tickr.controllers', [])
Tickr

.controller('IntroCtrl', function(UserService,$scope, $rootScope, $state , $http) {


  $rootScope.urlAuthLogout = "http://tickr-app.herokuapp.com/api/auth/logout";
  $rootScope.urlAuthUserId = "http://tickr-app.herokuapp.com/api/auth/userId";
  $rootScope.urlHasSession = "http://tickr-app.herokuapp.com/api/auth/hasSession";
  $rootScope.urlUserInfo   = "http://tickr-app.herokuapp.com/api/user/info";
  $rootScope.urlTick       = "http://tickr-app.herokuapp.com/api/tick";
  $rootScope.urlMatch      = "http://tickr-app.herokuapp.com/api/match";


  var logout = function(){
      
      UserService.logOut(function(data){

        if(data.status == 0){
          alert("loged out!");
        };

      });
      
  };


  var getUserData = function() {
    UserService.getUserId(function(data){

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

    UserService.getUserInfo(function(data){

      if(data.status){
        alert("Error getting user info");
      }

      if(data.userId){
        $rootScope.userName   = data.userName;
        $rootScope.about      = data.about;
        $rootScope.userPhoto  = data.photo;
        $rootScope.userInfo   = data.info;
      }else{
        alert("Error login, contact developers");
      }
    });

  };


  // Called to navigate to the main app
  var checkSession = function() {

    UserService.checkSession(function(data){
        
        if(data.status == 0){
          if(!$rootScope.userId){
            getUserData();
          }  
          $state.go('menu.main');
        }else{
          $state.go('intro');
        }
    });

  };

  checkSession();

})

.controller('MenuCtrl',function(MatchService,$scope,$rootScope){


  $scope.matches = new Array();

  //Recovers the matches for the right menu
  $scope.getMatches = function(){

      alert($rootScope.userName);

      MatchService.getMatches(function(res){

        $scope.matches = res;
        $scope.$apply();
    
    });
  };

})


.controller('User',function(UserService,$scope,$rootScope){

  $scope.photo = $rootScope.userPhoto;
  $scope.name = $rootScope.userName;
  $scope.about = $rootScope.about;
  $scope.fbVisibility = $rootScope.userInfo.fbVisibility;
  $scope.emailVisibility = $rootScope.userInfo.emailVisibility;
  $scope.telVisibility = $rootScope.userInfo.telVisibility;

  $scope.goBack = function(){

    var data = Object();
    data.userId = $rootScope.userId;
    data.name = $scope.name;
    data.about = $scope.about;
    data.fbVisibility = $scope.fbVisibility;
    data.emailVisibility = $scope.emailVisibility;
    data.telVisibility = $scope.telVisibility;

    UserService.setUserInfo(data);

    $state.go('menu.main');
  };



})

.controller('MainCtrl',  function(TicksService, $scope, $rootScope, 
                                  $ionicLoading, $ionicSideMenuDelegate, $state) {

  //Value for validate the tick button dont response until 3seg
  $scope.isEnable = true;

  //For the left menu
  $scope.toogleLeft = function(){
    $ionicSideMenuDelegate.toogleLeft();
  };

  $scope.toogleRight = function(){
    $ionicSideMenuDelegate.toogleRight();
  };



  $scope.clickTick = function(){

    var clicked = TicksService.click();

    if( clicked == false ){
      startTick();
    }else{
      $ionicLoading.show();
      sendTick();
    }

  };

  var startTick = function() {
 
    $scope.isEnable = false;
    TicksService.send(function(data){

      if(data == 3){
        $state.go('intro');
      }else if(data == 1 ){
        $state.go('menu.main');
      }

    });

    $('#text').text('Click again on green!');
    $('.main').animate({'background-color':'#4AD39C'},3000);

    setTimeout(function(){ $scope.isEnable = true; } , 3000);

  };

  var sendTick = function() {
      
      function checkFlag() {
          if($rootScope.returnTick != 0) {
             window.setTimeout(checkFlag, 2000); /* this checks the flag every 100 milliseconds*/
          }else{
            $state.go('ticks');
          }
      }

      checkFlag();

  }
})

.controller('Ticks', function(TicksService,$scope,$rootScope,$ionicLoading,$state){

  $scope.goBack = function(){
    $state.go('menu.main');
  };


  //Get ticks from server
  TicksService.getTicks(function(data){

        if(data.length == 0){
          alert("No ticks near");
          $state.go('menu.main');
        }

        $scope.nearTicks = data;

        //Save the nearest for being shown with more importance
        $scope.firstTick = $scope.nearTicks[0]; 

        //Remove the first one to generate a list
        $scope.nearTicks.shift(); 

        if($scope.nearTicks.length < 3){

          for (var i = $scope.nearTicks.length; i < 3; i++) {

            var fakeUser = new Object();

            fakeUser.userId = "";
            fakeUser.userName = "";
            fakeUser.photo = "";
            fakeUser.about = "";

            $scope.nearTicks.push(fakeUser);
          };

        }

        $ionicLoading.hide();     

  });

  $scope.sendMatch = function(matchId){

    //To fix the problem sending the firstTick userID
    if(matchId == 1){
      matchId = $scope.firstTick.userId;
    }

    $ionicLoading.show();

    TicksService.sendMatch(matchId,function(data){

      $ionicLoading.hide();
      if(data.status == 3){
        $state.go('intro');
      }else{
        $state.go('menu.main');
      }

    });

  }
 
  

});
