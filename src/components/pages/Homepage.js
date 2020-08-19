import React, {Component} from "react";
import Tweets from "../Tweets/Tweets";
import Grid from "@material-ui/core/Grid";
import InsertTweet from "../Tweets/InsertTweet";
import TweetService from "../Tweets/TweetService";

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        };

        this.getAllFriendsTweets = this.getAllFriendsTweets.bind(this);
    }

    userID = {
        userID: 1
    };

    componentDidMount() {
        this.getAllFriendsTweets();
    }

    getAllFriendsTweets() {
        TweetService.getAllTweetsFromFriends(this.userID)
            .then(res => this.setState({
                tweets: res.data,
            }))
    }

    onShowAlert = () => {
        this.setState({showAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({showAlert: false})
            }, 2000)
        });
        this.props.history.replace({state: undefined});
    };

    onDismiss() {
        this.setState({showAlert: false});
        this.props.history.replace({state: undefined});
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <div className={"tweetsHomepage"}>
                            <Tweets tweets={this.state.tweets}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className={"tweetsHomepage"}>
                            <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>New tweet</p>
                            <InsertTweet handler={this.getAllFriendsTweets}/>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Homepage;