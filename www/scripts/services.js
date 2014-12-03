'use strict';
//angular.module('Tickr.services', [])
Tickr

.service('TicksService',function($rootScope,$state,$http,$q){

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

  this.send = function(){


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
		        alert('Error sending tick!');
		        $rootScope.returnTick = data.status;
		      }else if( data.status == 0 ){
		        $rootScope.returnTick = data.status;
		      }else {
		        alert('WTF happend?');
		        alert(data.status);
		        $rootScope.returnTick = 1;
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

	}

  };


  this.getTicks = function(next){

  	$.get($rootScope.urlTick + "?userId=" + $rootScope.userId, function(res){

  		next(res);

  	});

  };

});


















