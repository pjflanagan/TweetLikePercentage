
const SELECTORS = {
  tweets: '[data-testid="tweet"]',
  tweetLikes: '[data-testid="like"]',
  tweetRetweets: '[data-testid="retweet"]',
  tweetViews: '[role="link"]',
  tweetButtonText: '[data-testid="app-text-transition-container"] span span',
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

function getTweetReweetCount(tweet) {
  return parseInt(
    $(tweet)
      .find(SELECTORS.tweetRetweets)
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
    .find(SELECTORS.tweetButtonText)
    .text(`${percent.toFixed(2)}%`);
}

function replaceTweetRetweetCountWithTweetRetweetPercentage(tweet, percent) {
  $(tweet)
    .find(SELECTORS.tweetRetweets)
    .find(SELECTORS.tweetButtonText)
    .text(`${percent.toFixed(2)}%`);
}

function scanAndModifyTweets() {
  const tweets = getTweets();
  // console.log(tweets);
  for (let i = 0; i < tweets.length; ++i) {
    const tweetLikeCount = getTweetLikeCount(tweets[i]);
    const tweetRetweetCount = getTweetReweetCount(tweets[i]);
    const tweetViewCount = getTweetViewCount(tweets[i]);
    // console.log({ tweetRetweetCount, tweetLikeCount, tweetViewCount });

    if (tweetLikeCount && tweetViewCount) {
      const likePercent = 100 * tweetLikeCount / tweetViewCount;
      replaceTweetLikeCountWithTweetLikePercentage(tweets[i], likePercent);
    }
    if (tweetRetweetCount && tweetViewCount) {
      const retweetPercent = 100 * tweetRetweetCount / tweetViewCount;
      replaceTweetRetweetCountWithTweetRetweetPercentage(tweets[i], retweetPercent);

    }
  }
}

window.onload = function() {
  setInterval(function(){
    scanAndModifyTweets();
  }, 400);
}
