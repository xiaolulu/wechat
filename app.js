var express = require( 'express' ),
	lib = require( './lib/tool'),
    http    = require( 'http' );
			
var app = express();
server = http.Server( app );

app.set( 'port', process.env.PORT || 4000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.use( function( req, res ){
        res.send(req.query.echostr);
});

function a(){
	lib.reqConfig({
		    path : '/cgi-bin/token?grant_type=client_credential&appid=wxfb96cc74703eb978&secret=d49d5f6febd267637d85c56af4370bce',
	}, function(data){
		    console.log( data)
	})

}

setTimeout( a, 2000 );


server.listen( app.get( 'port'), function(){
        console.log( 'server start ' + app.get( 'port' ) );
});

