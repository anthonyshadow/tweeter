/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatar": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatar": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

//Render new Tweet 

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $('.tweet-container').prepend(createTweetElement(tweet));
  }
}

//Function to create new tweet in proper format

const createTweetElement = function (tweet) {
  const $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <img src=${tweet.user.avatar}>
        <p>${tweet.user.name}</p>
        <p class="handle">${tweet.user.handle}</p>
      </header>
      <div class="tweet-input">
        <p>${tweet.content.text}</p>
      </div>
      <footer>
        <p class="tweet-time-posted">${tweet.created_at}</p>
        <div class="tweet-icons">
          <img src="/images/flag.png" alt="flag">
          <img src="/images/startup.png" alt="retweet">
          <img src="/images/like.png" alt="like">
        </div>
      </footer>
    </article>
  `;
  return $tweet
}

$(document).ready(function () {
  renderTweets(data);
})
