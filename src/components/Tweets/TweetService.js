import DataService from '../service/DataService';
import {
    ADD_LIKE,
    ALL_TWEETS_FRIENDS,
    DELETE_TWEETS,
    GET_TWEET_BY_ID,
    INSERT_TWEET,
    LIKE_CHECK,
    REMOVE_LIKE,
    TWEET_NUMBER_OF_LIKES,
    TWEETS_BY_USER,
    UPDATE_TWEETS
} from "../../const/Const";

class TweetService {

    getAllTweetsFromFriends(userID) {
        return DataService.post(ALL_TWEETS_FRIENDS, userID);
    }

    getTweetById(tweetID) {
        return DataService.post(GET_TWEET_BY_ID, {
                tweet_id: tweetID
            }
        );
    }

    getMyTweets (data) {
        return DataService.getWithPatram(TWEETS_BY_USER, {
            user: data
        });
    }

    getLikesForTweet(tweetID) {
        return DataService.getWithPatram(TWEET_NUMBER_OF_LIKES, {
            tweet_id: tweetID
        });
    }

    addTweet(tweet) {
        return DataService.add(INSERT_TWEET, tweet);
    }

    updateTweet(data) {
        return DataService.update(UPDATE_TWEETS, data);
    }

    deleteTweet(id) {
        return DataService.delete(DELETE_TWEETS, {
            tweet_id: id
        })
    }

    checkTweet(tweetID, userID) {
        return DataService.post(LIKE_CHECK, {
                tweet_id: tweetID,
                user_id: userID
            }
        );
    }

    like(tweetID, userID) {
        return DataService.post(ADD_LIKE, {
                tweet_id: tweetID,
                user_id: userID
            }
        );
    }

    unlike(tweetID, userID) {
        return DataService.delete(REMOVE_LIKE, {
            tweet_id: tweetID,
            user_id: userID
        });
    }
}

export default new TweetService();