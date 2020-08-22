export const BASE_URL = "http://localhost:9000";
export const LOGIN_URL = BASE_URL+"/login";
export const REGISTER_URL = BASE_URL+"/register";

export const ALL_TWEETS_FRIENDS = BASE_URL + '/tweets/friend'
export const GET_TWEET_BY_ID = BASE_URL + '/tweet';
export const INSERT_TWEET = BASE_URL + '/tweets/insert';
export const TWEETS_BY_USER = BASE_URL + '/tweets/user';
export const UPDATE_TWEETS = BASE_URL + '/tweets/update';
export const DELETE_TWEETS = BASE_URL + '/tweets/delete';
export const TWEET_NUMBER_OF_LIKES = BASE_URL + '/tweet/likes';

export const FRIENDS = BASE_URL + '/users/friends';
export const FOLLOWERS = BASE_URL + '/users/followers';
export const NON_FRIENDS = BASE_URL + '/users/non-friends';
export const ADD_FRIEND = BASE_URL + '/users/add-friend';
export const REMOVE_FRIEND = BASE_URL + '/users/remove-friend';
export const PASSWORD_CHANGE = BASE_URL + '/user/password/update';
export const UPDATE_USER = BASE_URL + '/user/update';

export const ADD_LIKE = BASE_URL + '/like';
export const REMOVE_LIKE = BASE_URL + '/like/remove';
export const LIKE_CHECK = BASE_URL + '/like/check';