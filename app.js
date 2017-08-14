/**
CHANGELOG:
1. created bot that retweets tweets based on params (2017/07/15)
2. bot now follows anyone that has a tweet with params (2017/08/14)
3. added scheduler task to allow run the both indefinitely on local (2017/08/14)
*/

// app.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '#glasgowfood',
  count: 5,
  result_type: 'recent',
  lang: 'en'
}

//searches tweets, retweets.
//code could be edited to favourite them too
//based on 	https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078
function runBot() {
	T.get('search/tweets', params, function(err, data, response) {
	  if(!err){
	  	

	    for(let i = 0; i < data.statuses.length; i++){
	    	let screen_name = data.statuses[i].user.screen_name;
		      let id = { id: data.statuses[i].id_str };
		      T.post('statuses/retweet', id, function(err, response){
		        if(err){
		          console.log(err[0].message);
		        }
		        else{
		          let tweetId = response.id_str;
		          console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`);
		        }
		      });
		      T.post('friendships/create', {screen_name}, function(err, res){
		        if(err){
		          console.log(err[0].message);
		        }
		        else if (res.following === true) {
		        	console.log('You are already following this account');
		        }
		        else{
		          console.log('followed: ', `https://twitter.com/${screen_name}`);
		        }
		      });
	    }
	  } else {
	    console.log(err);
	  }
	})
}

setInterval(function(){ runBot(); }, 100000);