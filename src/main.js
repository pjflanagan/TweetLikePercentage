
const SELECTORS = {
  tweets: '[data-testid="tweet"]',
  tweetLikes: '[data-testid="like"]',
  tweetLikeText: '[data-testid="app-text-transition-container"] span span',
  tweetRetweets: undefined,
  tweetViews: '[role="link"]',
}

function getTweets() {
  return $(SELECTORS.tweets);
}

function getTweetLikeCount(tweet) {
  return parseInt(
    $(tweet)
      .find(SELECTORS.tweetLikes)
      .attr('aria-label')
  );
}

function getTweetViewCount(tweet) {
  const links = $(tweet).find(SELECTORS.tweetViews);
  const viewLink = links[links.length - 1]

  return parseInt(
    $(viewLink)
      .attr('aria-label')
  );
}

function replaceTweetLikeCountWithTweetLikePercentage(tweet, percent) {
  $(tweet)
    .find(SELECTORS.tweetLikes)
    .find(SELECTORS.tweetLikeText)
    .text(`${percent.toFixed(2)}%`);
}

function scanAndModifyTweets() {
  const tweets = getTweets();
  console.log(tweets);
  for (let i = 0; i < tweets.length; ++i) {
    const tweetLikeCount = getTweetLikeCount(tweets[i]);
    const tweetViewCount = getTweetViewCount(tweets[i]);
    console.log({ tweetLikeCount, tweetViewCount });

    const likePercent = 100 * tweetLikeCount / (tweetViewCount + 1);
    console.log({ likePercent });

    replaceTweetLikeCountWithTweetLikePercentage(tweets[i], likePercent);
  }
}

// let testTweets;
// function testOneTweet() {
//   testTweets = getTweets();
//   getTweetLikeCount(testTweets[0])
//   getTweetViewCount(testTweets[0])
//   replaceTweetLikeCountWithTweetLikePercentage(testTweets[0], 74);
// }

window.onload = function() {
  setInterval(function(){
    scanAndModifyTweets();
  }, 400);
}
