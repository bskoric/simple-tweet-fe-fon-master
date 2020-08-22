import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Tweet from "./Tweet";

class Tweets extends Component {

    render() {
        const tweets = this.props.tweets;
        return (
            <>
                {tweets.length === 0 && <div style={{fontFamily: "Lemonada"}}>Sorry, there is no tweets to show</div>}

                {tweets.map(tweet => (
                    <Tweet {...tweet} key={tweet.tweet_id}
                           deleteButton={this.props.delete ? this.props.delete.bind(this, tweet.tweet_id) : undefined}
                           editButton={this.props.edit ? this.props.edit.bind(this, tweet.tweet_id) : undefined}/>
                ))}
            </>
        );
    }
}

export default withRouter(Tweets);