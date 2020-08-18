import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Tweet from "./Tweet";

class Tweets extends Component {

    render() {
        const tweets = this.props.tweets;
        return (
            <>
                {tweets.map(tweet => (
                    <Tweet {...tweet} key={tweet.tweet_id}/>
                ))}
            </>
        );
    }
}

export default withRouter(Tweets);