import DataService from '../service/DataService';
import {
    ALL_TWEETS_FRIENDS,
    DELETE_TWEETS,
    GET_TWEET_BY_ID,
    INSERT_TWEET,
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
}

export default new TweetService();