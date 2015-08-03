var querystring = require('querystring'),
BufferHelper = require('BufferHelper'),
https = require('https'),
http = require('http');
function reqConfig(config, callback) {
	
	
	https.get("https://api.weixin.qq.com" + config.path, function(res) {
	  res.on( 'data', function(d){
			d = JSON.parse( d ) 
			console.log( d );
			createMenu({ token: d })
		})
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
    

}

var menuItem = {
     "button":[
     {	
          "type":"click",
          "name":"今日",
          "key":"V102000001"
      },
      {	
          "type":"click",
          "name":"歌曲",
          "key":"V101222222"
      },
		{	
          "type":"click",
          "name":"日歌",
          "key":"V100333333"
      }]
 }

function createMenu( config ){
	var postData = JSON.stringify( menuItem);
	console.log( postData );
	var options = {
	  hostname: 'api.weixin.qq.com',
	  port: 443,
	  path: '/cgi-bin/menu/create?access_token=' + config.token.access_token,
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	  }
	};
	console.log( options );
	var req = https.request(options, function(res) {
	  
	  res.on('data', function (d) {
		console.log(JSON.parse( d ));
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(postData);
	req.end();
}
module.exports = {

    reqConfig: reqConfig

}
