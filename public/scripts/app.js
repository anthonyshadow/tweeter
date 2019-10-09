/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
// ]
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
        <img src=${tweet.user.avatars}>
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

//call to render new Tweets

// $(document).ready(function () {
//   renderTweets(data);
// })

//Ajax post request


$(function () {
  $(".submit-tweet").on('submit', function(event) {
    event.preventDefault();
    const $input = $("#tweet-text-box").serialize();
    const text = $input.split("=")[1]
    if (!text) {
      alert("You didn't type anything");
    } else if (text.length > 140) {
      alert("Your tweet is over 140 characters!");
    } else {
      $.ajax("/tweets", {
        method: 'POST',
        data: $("#tweet-text-box").serialize(),
        success: function() {
          console.log("hello");
        }
      })
    }
  })
})


const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET",
    success: function(data) {
      renderTweets(data);
    }
  })
}


$(document).ready(function () {
  loadTweets();
})

