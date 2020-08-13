import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import TweetService from "./TweetService";
import Tweet from "./Tweet";

class Tweets extends Component {

    userID = {
        userID: 1
    }

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        };
    }

    componentDidMount() {
        TweetService.getAllTweetsFromFriends(this.userID)
            .then(res => this.setState({
                tweets: res.data,
            }))
    }

    render() {
        return (
            <>
                {this.state.tweets.map(tweet => (
                    <Tweet {...tweet} key={tweet.tweet_id}/>
                ))}
            </>
        );
    }
}

export default withRouter(Tweets);