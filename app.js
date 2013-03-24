// Twitter
var twitter = require('ntwitter'),
	tConfig = require('./block_github/twitter.json');

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , request = require('request')

 var rtn = new Array();
  
 function getTwitter()
 {
		rtn = new Array();
  
		// Twitter
		var twit = new twitter({
		  consumer_key: tConfig.consumerKey,
		  consumer_secret: tConfig.consumerSecret,
		  access_token_key: tConfig.accessToken,
		  access_token_secret: tConfig.accessTokenSecret
		 });
		 
		 var sqrl = new Array();
		 sqrl[0] = 'secretsqrl1';
		 sqrl[1] = 'secretsqrl2';
		 sqrl[2] = 'secretsqrl3';
	
		var i = 0;
	
		sqrl.forEach(function(nm) {
			// Twitter
			twit.get('https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=' + nm + '&count=10', function(err, data) {
				console.log(data);
				
				data.forEach(function(item) {
					item.geo.coordinates[2] = nm;
					item.geo.coordinates[3] = item.text;
					item.geo.coordinates[4] = parseTwitterDate(item.created_at);
					item.geo.coordinates[5] = item.id;
					rtn[i] = item.geo.coordinates;
					i += 1;
				});
			});
		});
}
		
function parseTwitterDate($stamp)
{		
// convert to local string and remove seconds and year //		
	var date = new Date(Date.parse($stamp)).toLocaleString().substr(0, 16);

// get the two digit hour //
	var hour = $stamp.substr(11, 2);

// convert to AM or PM //
	var ampm = hour<12 ? ' AM' : ' PM';
	if (hour>12) hour-= 12;
	if (hour==0) hour = 12;
// return the formatted string //
	return '3/'+date.substr(8, 2)+'@' + hour + $stamp.substr(13, 2) +  ampm;
}

		  /*
 *  Setup Express
 */
var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));

app.use("/dist", express.static(__dirname + '/dist'));
app.use("/dist/images", express.static(__dirname + '/dist/images'));

app.get('/refresh', function(req,res)
{
	getTwitter();
	
	/*loadView('home', res);*/
});

app.get('/home', function(req,res)
{
	res.render('blank',
	{
		mainContent : JSON.stringify(rtn)
	});
	
	/*loadView('home', res);*/
});


app.listen(3000);