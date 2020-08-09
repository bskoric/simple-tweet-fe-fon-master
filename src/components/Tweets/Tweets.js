import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom"
import TweetService from "./TweetService";

class Tweets extends Component {

    userID = {
        userID: 1
    }
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            alertMessage: "",
            showAlert: false
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
                <h1>TWEETS</h1>
                {this.state.tweets.map(tweet => <h1>{tweet.title}</h1>)}
            </>
        );
    }
}

export default withRouter(Tweets);