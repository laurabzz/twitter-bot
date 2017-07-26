// app.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '#glasgowfood',
  count: 30,
  result_type: 'recent',
  lang: 'en'
}

//searches tweets, retweets.
//code could be edited to favourite them too
//based on 	https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078
T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    for(let i = 0; i < data.statuses.length; i++){
      let id = { id: data.statuses[i].id_str }
      T.post('statuses/retweet', id, function(err, response){
        if(err){
          console.log(err[0].message);
        }
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})