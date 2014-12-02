
//Auxiliary function
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}


function login() {

    var ref = window.open('http://tickr-app.herokuapp.com/api/auth/facebook', '_blank', 'location=no','closebuttoncaption=Im done!');
    
    ref.addEventListener('loadstop', function(event) { 
        if( event.url.startsWith("http://tickr-app.herokuapp.com/api/auth/facebook/callback") ){
            ref.close();
        };
    });
    ref.addEventListener('exit', function() { 
        window.location.reload(false); 
    });
};

// function startTick() {
        
//     $('#text').text('Release on green!');
//     $('.main').animate({'background-color':'#4AD39C'},3000);

// };

