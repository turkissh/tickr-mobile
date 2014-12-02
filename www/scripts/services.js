'use strict';
//angular.module('Tickr.services', [])
Tickr

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

		    var data = Object();
		    data.userId = $rootScope.userId;
		    data.long = long;
		    data.lat = lat;

		    $.post("http://tickr-app.herokuapp.com/api/tick",data,function(data) {
		      if( data.status == 1){
		        alert('Error sending tick!');
		        $rootScope.returnTick = data.status;
		      }else if( data.status == 0 ){
		      	alert("Tick recieved by server");
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

		alert('Getting position');

		navigator.geolocation.getCurrentPosition(success, error,options);
	          
	}else{

		alert("Geolocalization no supported!");

	}

  };

});