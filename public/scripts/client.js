/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = tweetObj => {
    const newTweet = 
    `
    <article>
    <header class="tweet-head">
      <div>
        <img src=${tweetObj.user.avatars}/>
        <span>${tweetObj.user.name}</span>
      </div>
      <div>
        <span>${tweetObj.user.handle}</span>
      </div>
    </header>
      <div>
        <span>${tweetObj.content.text}</span>
      </div>
    <footer class="tweet-foot">
      <div>
        <span>${moment(tweetObj.created_at).fromNow()}</span>
      </div>
      
      <div class="tweet-reactions"> 
        <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
      </div>
    </footer>
    </article>
    `
    return newTweet;
  }
  
  const renderTweets = arrayOfTweetObj => {
    // instead of append we will use prepend to see newly added tweets
    for (let obj of arrayOfTweetObj) {
      $('.tweet-container').prepend(createTweetElement(obj))
    }
  }
  
  const ajaxPost = (url, data, callback) => {
    $.post(url, data, callback);
  }
  
  const getText = queryString => {
    let text = '';
    for (let index in queryString) {
      if (index > 4) {
        text += queryString[index];
      }
    }
    return text.replace(/%20/g, " ");
  }
  
  $(document).ready(function() {
    const loadtweets = $.get('/tweets', function(data) {
        renderTweets(data);
    })
  
    $('button').click(function(event) {
        event.preventDefault();
        const data = $('form').serialize()
        const dataLength = (getText(data)).length;
        if (dataLength > 140) {
          alert('You wrote too many characters');
        } else if (dataLength === 0) {
          alert("You didn't write anything");
        } else {
          const dataToPost = ajaxPost('/tweets', data, function() {
            $.get('/tweets', function(data) {
              renderTweets(data)
              //need to figure out how to clear the text box after tweets are posted
            })
          })
        }
    })
  })