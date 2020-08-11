import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import TweetService from "./TweetService";
import Grid from "@material-ui/core/Grid";
import Tweet from "./Tweet";

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

                <Grid item xs={12} md={8}>
                    {this.state.tweets.map(tweet => (
                        <Tweet {...tweet} key={tweet.tweet_id}/>
                    ))}
                </Grid>
            </>
        );
    }
}

export default withRouter(Tweets);