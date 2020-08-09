import DataService from '../service/DataService';

const ALL_TWEETS_FRIENDS = 'http://localhost:9000/tweets/friend';


class TweetService {

    getAllTweetsFromFriends(userID) {
        return DataService.post(ALL_TWEETS_FRIENDS, userID);
    }
}

export default new TweetService();