import DataService from '../service/DataService';
import {ALL_TWEETS_FRIENDS, INSERT_TWEET, TWEETS_BY_USER} from "../../const/Const";

class TweetService {

    getAllTweetsFromFriends(userID) {
        return DataService.post(ALL_TWEETS_FRIENDS, userID);
    }

    getMyTweets (data) {
        return DataService.getWithPatram(TWEETS_BY_USER, data);
    }

    addTweet(tweet) {
        return DataService.add(INSERT_TWEET, tweet);
    }
}

export default new TweetService();