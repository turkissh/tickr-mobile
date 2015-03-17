'use strict';
//angular.module('Tickr.services', [])
Tickr


.service('UserService',function($rootScope,$scope){

	this.logOut = function(callback){

		$.get($rootScope.urlAuthLogout,function(data){

	      callback(data);

	    });

	};

	this.getUserId = function(callback){

		$.get($rootScope.urlAuthUserId,function(data){

			callback(data);

		});

	};


	this.getUserInfo = function(callback){

		$.get($rootScope.urlUserInfo + "?userId=" + $rootScope.userId
		 ,function(data){

			callback(data);
		});

	};

	this.checkSession = function(callback){

		$.get($rootScope.urlHasSession,function(data){

			callback(data);

		});
	};


	this.setUserInfo = function(payload){

		$.post($rootScope.urlUserInfo,payload,function(data){

			if(data.status == 1){
				alert("Error updating user info");
			};
			
		});



	};

})


.service('TicksService',function($rootScope,$state){

  $rootScope.clicked = false;

  this.click = function(){

    if($rootScope.clicked == false){
      $rootScope.clicked = true;
      return false;
    }else{
      $rootScope.clicked = false;
      return true;
    }
  };

  this.send = function(callback){


    var lat;
    var long;

    var options = {
      enableHighAccuracy: true,
      timeout:10000
    };

    function success(pos) {
      
    	var crd = pos.coords;

		  lat = crd.latitude;
		  long = crd.longitude;

		    var payload = Object();
		    payload.userId = $rootScope.userId;
		    payload.long = long;
		    payload.lat = lat;

		    $.post($rootScope.urlTick , payload , function(data) {
		      if( data.status == 1){
		      	//Some error
		        alert('Error sending tick!');
		        $rootScope.returnTick = data.status;
		        callback(1);
		      }else if( data.status == 0 ){
		      	//Succesfull
		        $rootScope.returnTick = data.status;
		        callback(0);
		      }else if( data.status == 3){
		      	//Unlogged
		      	callback(3);
		      }else{
		        alert('WTF happend?');
		        alert(data.status);
		        $rootScope.returnTick = 1;
		        callback(1);
		      }
		    },"json");

    };

    function error(err) {
      alert('ERROR(' + err.code + '): ' + err.message);
    };


	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(success, error,options);
	          
	}else{

		alert("Geolocalization no supported!");
		callback(1);

	}

  };


  this.getTicks = function(callback){

  	$.get($rootScope.urlTick + "?userId=" + $rootScope.userId, function(res){

  		callback(res);

  	});

  };


  this.sendMatch = function(matchId , callback){

  	var payload = Object();
	payload.userId = $rootScope.userId;
	payload.matchId = matchId;

	$.post($rootScope.urlMatch , payload , function(data) {
	      if( data.status == 1){
	        alert('Error loading match!');
	      }else if( data.status == 3 ){
	        alert('Not logged!');
	      }else if( data.status == 0 ){
	      	
	      }else{
	      	alert("Something happend with the server, try again later");
	      }

	      callback(data);
	    },"json");

  };

})

.service('MatchService',function($rootScope,$state){

	this.getMatches = function(callback){

		$.get($rootScope.urlMatch + "?userId=" + $rootScope.userId,function(res){

			if(res.status == 1){
				alert("General error finding user");
			}else if(res.status == 2){
				alert("Error user dosent exists");
			}

			callback(res);

		});

	};


});


















