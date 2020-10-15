var Twit = require('twit')
const express = require('express')

const app = express()

var T = new Twit({
    consumer_key: 'U0x7oas6iLXYbYTBCTfZ41z6y',
    consumer_secret: 'jqzSGxGHZCubzPv2u28cJPO7USjh3BWIgxwOdMFoH76OVUheDe',
    access_token: '291269806-DDJ0iXpYDNFjLqqCeQ6If2QSBdA2Cmz7yyvt74tD',
    access_token_secret: 'PgnsjR3MZVYdDUdaDjIaInAHF2PMf8XPORNtwpeQm5kGt',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

app.get('/tweets/:string', function (req, res) {

    let hashtag = `#${req.params.string}`
    let tweets = []

    T.get('search/tweets', {
        q: hashtag,
        count: 100
    }, function (err, data, response) {

        data.statuses.forEach(element => {
            
            var tweetObject = {
                name: element.user.name,
                date: element.created_at,
                content: element.text,
                hashtags: element.entities.hashtags,
                location: element.user.location,
                retweets: element.retweet_count,
                source: element.source,
                photo: element.user.profile_image_url
            }

            tweets.push(tweetObject)

        });
        
        res.send(tweets)
    })
})

app.listen(3000)