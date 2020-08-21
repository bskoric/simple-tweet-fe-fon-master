import React, {Component} from "react";
import Tweets from "../Tweets/Tweets";
import Grid from "@material-ui/core/Grid";
import TweetService from "../Tweets/TweetService";
import Divider from "@material-ui/core/Divider";
import AuthService from "../service/AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Alert from "@material-ui/lab/Alert";

class UserTweetsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            tweet: {
                id: '',
                title: '',
                post: ''
            },
            alertMessage: "",
            showAlert: false,
            hasError: false,
            editTweet: false
        };

        this.getMyTweets = this.getMyTweets.bind(this);
        this.handleEditFormChange = this.handleEditFormChange.bind(this);
        this.handleFormEditSubmit = this.handleFormEditSubmit.bind(this);
        this.myDivToFocus = React.createRef();
    }

    componentDidMount() {
        this.getMyTweets();
    }

    getMyTweets() {
        TweetService.getMyTweets( AuthService.getLoggedInUsername())
            .then(res => this.setState({
                tweets: res.data,
            })).catch(error => console.log(error))
    }

    onShowAlert = () => {
        this.setState({showAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({showAlert: false})
            }, 2000)
        });
    };

    deleteTweet = (id) => {
        TweetService.deleteTweet(id).then(res => {
                this.setState({
                    tweets: [...this.state.tweets.filter(tweet =>
                        tweet.tweet_id !== id)],
                    hasError: false,
                    alertMessage: "Tweet is deleted !",
                });
                this.onShowAlert()
            }
        ).catch(

        )
    };

    showEditForm = (id) => {

        TweetService.getTweetById(id).then(res => {
            const tweet = {
                title: res.data[0].title,
                post: res.data[0].post,
                id: id
            };
            this.setState({
                tweet: tweet
            })
        });

        this.setState({
            editTweet: true,
        });

        if(this.myDivToFocus.current){
            this.myDivToFocus.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }
    };

    closeEditForm = () => {
      this.setState({
          editTweet: false
      })
    };

    handleEditFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tweet = {...this.state.tweet};
        tweet[name] = value;
        this.setState({tweet});
    }

    async handleFormEditSubmit(event) {
        event.preventDefault();
        const {tweet} = this.state;

        TweetService.updateTweet(tweet).catch( error => {
                console.log(error.response.data.ErrorMessage);
            this.setState({
                hasError: true,
                alertMessage: "Error !",
            });
            }
        ).then( response =>{
            this.getMyTweets();
            this.setState({
                hasError: false,
                alertMessage: "Tweet is updated !",
            });
            this.onShowAlert();
        });
    }

    render() {
        const {tweet} = this.state;

        return (
            <div className="userTweetContainer">

                <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>My tweets</p>

                <Divider/>

                {this.state.hasError === true && this.state.showAlert &&
                <Alert severity="error">{this.state.alertMessage}</Alert>}

                {this.state.hasError === false && this.state.showAlert &&
                <Alert severity="success">{this.state.alertMessage}</Alert>}

                <Grid container>

                    <Grid item xs={12} md={8}>
                        <div className={"tweetsHomepage"}>
                            <Tweets tweets={this.state.tweets} delete={this.deleteTweet} edit={this.showEditForm} />
                        </div>
                    </Grid>

                    {this.state.editTweet &&
                    <Grid item xs={12} md={4} ref={this.myDivToFocus}>
                        <div className={"tweetsHomepage"}>
                        <form noValidate autoComplete="off" onSubmit={this.handleFormEditSubmit}>
                            <TextField label="Title" variant="outlined"
                                       name="title"
                                       id="title" value={tweet.title || ''}
                                       onChange={this.handleEditFormChange}
                                       fullWidth required/>
                            <TextField
                                label="Tweet"
                                placeholder={"Your tweet"}
                                multiline rows={7}
                                variant="outlined"
                                name="post"
                                id="post" value={tweet.post || ''}
                                onChange={this.handleEditFormChange}
                                style={{marginTop: 20}}
                                required fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                style={{marginTop: 20, backgroundColor: "#4f709e"}}
                            >
                                Edit tweet
                            </Button>
                            <br/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{marginTop: 20, backgroundColor: "#4f709e"}}
                                onClick={this.closeEditForm}
                            >
                                Close
                            </Button>
                        </form>
                        </div>
                    </Grid>}

                </Grid>
            </div>
        );
    }
}

export default UserTweetsPage;