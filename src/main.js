
function getTweets() {
  return $('[data-testid="tweet"]');
}

function getTweetLikeCount(tweet) {
  return parseInt(
    $(tweet)
      .find('[data-testid="like"]')
      .attr('aria-label')
  );
}

function getTweetViewCount(tweet) {
  const links = $(tweet).find('[role="link"]');

  return parseInt(
    $(links[links.length - 1])
      .attr('aria-label')
  );
}

function replaceTweetLikeCountWithTweetLikePercentage(tweet, percent) {
  $(tweet)
    .find('[data-testid="like"]')
    .find('[data-testid="app-text-transition-container"] span span')
    .text(`${percent.toFixed(2)}%`);
}

function scanAndModifyTweets() {
  const tweets = getTweets();
  console.log(tweets);
  tweets.each(t => {
    const tweetLikeCount = getTweetLikeCount(t);
    console.log(tweetLikeCount);
    const tweetViewCount = getTweetViewCount(t);
    console.log(tweetViewCount);
    const percent = 100 * tweetLikeCount / (tweetViewCount + 1);
    console.log(percent);
    replaceTweetLikeCountWithTweetLikePercentage(t, percent);
  })
}

window.onload = function() {
  setInterval(function(){
    scanAndModifyTweets();
  }, 100);
}
