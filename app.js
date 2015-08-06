var express = require( 'express' ),
	BufferHelper = require( 'BufferHelper' ),
	lib = require( './lib/tool'),
	path = require( 'path' ),
	bodyParser = require( 'body-parser' ),
    http    = require( 'http' );
			
var app = express();
server = http.Server( app );

app.set( 'port', process.env.PORT || 3001 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/', express.static( path.join( __dirname, 'assets' ))); //静态文件路径
app.use( bodyParser.urlencoded({ extended: false }));
app.use( function( req, res, next ){
        //res.send(req.query.echostr);
	//#console.log( req );
	//
	console.log( req.path );
	var bufferHelper = new BufferHelper();
	req.on( 'data', function(d){
		bufferHelper.concat( d);
	});
	req.on( 'end', function(){
		var html = bufferHelper.toBuffer().toString();
		console.log( html );
	})
	res.setHeader('Content-Type','application/xml');
	res.send('<xml><ToUserName><![CDATA[oNDsRs1JL7AO7ogeuPZ_OAF0SN0s]]></ToUserName><FromUserName><![CDATA[gh_7975c6ce425d]]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[你好]]></Content></xml>');
	//next();
});

app.get( '/index', function( req, res ){
	res.render( 'index.ejs' )
});

app.post( '/createMenu', function( req, res ){
	debugger
	lib.createMenu( req, res );
})

function a(){
	lib.reqConfig({
		    path : '/cgi-bin/token?grant_type=client_credential&appid=wxfb96cc74703eb978&secret=d49d5f6febd267637d85c56af4370bce',
	},  function(data){
		    console.log( data)
	})

}
a();
//setTimeout( a, 2000 );


server.listen( app.get( 'port'), function(){
        console.log( 'server start ' + app.get( 'port' ) );
});

