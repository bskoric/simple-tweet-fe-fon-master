import DataService from '../service/DataService';
import {
    ADD_FRIEND,
    FOLLOWERS,
    FRIENDS,
    NON_FRIENDS,
    PASSWORD_CHANGE,
    REMOVE_FRIEND,
    UPDATE_USER
} from "../../const/Const";

class UserService {

    getFriends(userID) {
        return DataService.post(FRIENDS, {userID: userID});
    }

    getFollowers(userID) {
        return DataService.post(FOLLOWERS, {userID: userID});
    }


    getNonFriends(userID) {
        return DataService.post(NON_FRIENDS, {userID: userID});
    }

    addFriend(userID, friendID) {
        return DataService.post(ADD_FRIEND, {userID: userID, friendID: friendID});
    }

    removeFriend(userID, friendID) {
        return DataService.delete(REMOVE_FRIEND, {userID: userID, friendID: friendID});
    }

    updateUser(data) {
        return DataService.update(UPDATE_USER, data);
    }

    passwordChange(username, oldPassword, newPassword) {
        console.log({
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        return DataService.update(PASSWORD_CHANGE, {
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    }
}

export default new UserService();