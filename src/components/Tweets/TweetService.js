import DataService from '../service/DataService';
import {ALL_TWEETS_FRIENDS, INSERT_TWEET} from "../../const/Const";

class TweetService {

    getAllTweetsFromFriends(userID) {
        return DataService.post(ALL_TWEETS_FRIENDS, userID);
    }

    addTweet(tweet) {
        return DataService.add(INSERT_TWEET, tweet);
    }
}

export default new TweetService();