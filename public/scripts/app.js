/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


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
        <p>${escape(tweet.content.text)}</p>
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


//Ajax post request, upon success loads new tweets. Also displays if user did not follow tweet guidelines


$(function () {
  $(".submit-tweet").on('submit', function(event) {
    event.preventDefault();
    const $input = $("#tweet-text-box").serialize();
    const text = $input.split("=")[1]
    if (!text) {
      $(".alert-container").slideDown();
      $(".error-message").text("I'm hungry, don't leave me empty!");
      // alert("You didn't type anything");
    } else if (text.length > 140) {
      $(".alert-container").slideDown();
      $(".error-message").text("That's too much! Your tweet is longer than 140");
      // alert("Your tweet is over 140 characters!");
    } else {
      $.ajax("/tweets", {
        method: 'POST',
        data: $("#tweet-text-box").serialize(),
        success: function() {
          loadTweets();
          $(".alert-container").slideUp();
          $("#tweet-text-box").val("");
          $(".counter").text(140);
        }
      })
    }
  })
})

//display new tweets on homepage

const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET",
    success: function(data) {
      $(".tweet-container").empty();
      renderTweets(data);
    }
  })
}

//Toggle new tweet box to appear oe disapear upon click

const toggle = function() {
  $(".slide-button").on("click", function() {
    $(".new-tweet").slideToggle();
  })
}



//scroll back to top button

const scrollUp = function() {
  $(".back-to-top").on("click", function () {
    $("html, body").animate({
      scrollTop: $("<nav>").offset().top + $('window').height()
    }, )
  })
}


$(document).on("scroll", function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    $(".back-to-top").css("display", "block");
  } else {
    $(".back-to-top").css("display", "none");
  }
});


//only allows functions to run once the page is fully loaded

$(document).ready(function () {
  loadTweets();
  toggle();
  $(".new-tweet").hide();
  scrollUp();
})
