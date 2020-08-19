import React, {Component} from "react";
import Tweets from "../Tweets/Tweets";
import Grid from "@material-ui/core/Grid";
import TweetService from "../Tweets/TweetService";
import Divider from "@material-ui/core/Divider";
import AuthService from "../service/AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

class UserTweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            tweet: {
                title: '',
                post: '',
                user: ''
            },
            editTweet: false
        };

        this.getMyTweets = this.getMyTweets.bind(this);
        this.myDivToFocus = React.createRef()
    }

    componentDidMount() {
        this.getMyTweets();
    }

    getMyTweets() {
        const param = {
            user: AuthService.getLoggedInUsername()
        };
        console.log(param);

        TweetService.getMyTweets(param)
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
        this.props.history.replace({state: undefined});
    };

    onDismiss() {
        this.setState({showAlert: false});
        this.props.history.replace({state: undefined});
    }

    deleteTweet = (id) => {
        console.log("DELETE" + id);
/*        this.props.history.replace({state: undefined});
        UserService.deleteUser(id)
            .then((response) => {
                this.setState({
                    users: [...this.state.users.filter(user =>
                        user.userId !== id)],
                    hasError: false,
                    alertMessage: "Successfully deleted!"
                })
            }).catch((error) => {
            this.setState({
                hasError: true,
                alertMessage: error.response.data.ErrorMessage
            });
        });
        this.onShowAlert();*/
    };

    editTweet = (id) => {
        console.log("EDIT" + id);
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


    render() {
        const {tweet} = this.state;

        return (
                <div className="userTweetContainer">
                    <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>My tweets</p>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12} md={10}>
                            <div className={"tweetsHomepage"}>
                                <Tweets tweets={this.state.tweets} delete={this.deleteTweet} edit={this.editTweet}/>
                            </div>
                        </Grid>

                        {this.state.editTweet && <Grid item xs={12} md={2} ref={this.myDivToFocus}>
                            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <TextField label="Title" variant="outlined"
                                           name="title"
                                           id="title" value={tweet.title || ''}
                                           onChange={this.handleChange}
                                           fullWidth required/>
                                <TextField
                                    label="Tweet"
                                    placeholder={"Your tweet"}
                                    multiline rows={7}
                                    variant="outlined"
                                    name="post"
                                    id="post" value={tweet.post || ''}
                                    onChange={this.handleChange}
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
                                    Post tweet
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{marginTop: 20, backgroundColor: "#4f709e"}}
                                >
                                    <Icon>clear</Icon>
                                </Button>
                            </form>
                        </Grid> }
                    </Grid>
                </div>
        );
    }
}

export default UserTweets;