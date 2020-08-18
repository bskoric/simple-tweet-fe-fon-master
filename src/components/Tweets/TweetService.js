import DataService from '../service/DataService';

const ALL_TWEETS_FRIENDS = 'http://localhost:9000/tweets/friend';
const INSERT_TWEET = 'http://localhost:9000/tweets/insert';


class TweetService {

    getAllTweetsFromFriends(userID) {
        return DataService.post(ALL_TWEETS_FRIENDS, userID);
    }

    addTweet(tweet) {
        return DataService.add(INSERT_TWEET, tweet);
    }
}

export default new TweetService();