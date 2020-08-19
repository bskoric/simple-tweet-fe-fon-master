import Axios from "axios/index";
import DataService from "./DataService";

export const USERNAME_SESSION_ATTRIBUTE_NAME = 'AuthUsername';
export const USER_SESSION_ATTRIBUTE_NAME = 'AuthUser';

class AuthService {

    login(username, password, url) {
        return DataService.post(url, {
            username: username,
            password: password
        })
    }

    register(data, url) {
        return DataService.post(url, data);
    }

    logout() {
        sessionStorage.removeItem(USER_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME);
        window.location.reload();
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    setupAxiosInterceptors(username, password) {
        const token = this.createBasicAuthToken(username, password);
        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    isUserLoggedIn() {
        const username = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
        const user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE_NAME);
        return ((user != null && user.length !== 0 )&& (username != null && username.length !== 0));

    }

    getLoggedInUser() {
        const user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE_NAME);
        if (user === null) return null;
        return JSON.parse(user);
    }

    getLoggedInUsername() {
        const username = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
        if (username === null) return '';
        return username
    }
}

export default new AuthService()
