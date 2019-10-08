// Function for Tweet Word counter

$(document).ready(function() {
  $("#tweet-text-box").keyup(function() {
    let length = $(this).val().length;
    let counter = 140;
    if (counter - length < 0) {
      $(".counter").css("color", "red");
    } else{
      $(".counter").css("color", "rgb(75, 49, 146)");
    }
    $(".counter").text(counter - length);
  });
});