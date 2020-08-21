import DataService from '../service/DataService';
import {
    FRIENDS,NON_FRIENDS
} from "../../const/Const";

class UserService {

    getFriends (userID) {
        return DataService.post(FRIENDS, {userID:userID});
    }

    getNonFriends (userID) {
        return DataService.post(NON_FRIENDS, {userID:userID});
    }

}

export default new UserService();