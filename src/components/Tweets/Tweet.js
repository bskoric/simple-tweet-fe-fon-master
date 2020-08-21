import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteDialog from "../layout/DeleteDialog";
import TweetService from "./TweetService";
import AuthService from "../service/AuthService";

class Tweet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            numberOfLikes: 0
        };
    }

    componentDidMount() {
        TweetService.checkTweet(this.props.tweet_id, AuthService.getLoggedInUser().user_id).then(res => {
            this.setState({
                liked: res.data.like === 1
            })
        });

        this.setNumberOfLikes();
    }

    setNumberOfLikes = () => {
        TweetService.getLikesForTweet(this.props.tweet_id).then(res => {
            this.setState({
                numberOfLikes: res.data.likes
            });
            this.setNumberOfLikes();
        })
    };

    like = (tweet_id) => {
        const user_id = AuthService.getLoggedInUser().user_id;
        TweetService.like(tweet_id, user_id).then(res => {
                this.setState({
                    liked: true
                })
            }
        );
    };

    unlike = (tweet_id) => {
        const user_id = AuthService.getLoggedInUser().user_id;
        TweetService.unlike(tweet_id, user_id).then(res => {
                this.setState({
                    liked: false
                });
            this.setNumberOfLikes();
            }
        ).catch(res => console.log(res.response.data));
    };

    render() {
        const tweet = this.props;
        const {tweet_id, title, post, first_name, last_name, date} = tweet;
        const liked = this.state.liked;
        const userFullName = first_name + " " + last_name;
        const avatarInitial = first_name.charAt(0) + last_name.charAt(0);

        const avatar = {
            backgroundColor: "rgb(220, 0, 78)"
        };

        return (

            <Grid item xs={12} md={10}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar style={avatar} aria-label="recipe">{avatarInitial}</Avatar>
                        }
                        title={userFullName}
                        subheader={new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    />
                    <CardContent>
                        <Typography variant="subtitle1" color="textPrimary" className={"tweetTitle"}>
                            {title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p" style={{marginTop: 5}}>
                            {post}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                        {!liked &&
                        <IconButton aria-label="add to favorites" onClick={this.like.bind(this, tweet_id)}>
                            <Tooltip title="Like" aria-label="like">
                                <FavoriteIcon/>
                            </Tooltip>
                        </IconButton>
                        }

                        {liked && <IconButton onClick={this.unlike.bind(this, tweet_id)}>
                            <Tooltip title="Liked" aria-label="liked">
                                <FavoriteIcon htmlColor={"red"}/>
                            </Tooltip>
                        </IconButton>}
                        {this.state.numberOfLikes}
                        {this.props.editButton && <IconButton aria-label="Edit" onClick={this.props.editButton}>
                            <Tooltip title="Edit" aria-label="Edit">
                                <EditIcon/>
                            </Tooltip>
                        </IconButton>}

                        {this.props.deleteButton &&
                        <DeleteDialog deleteAction={this.props.deleteButton}/>}

                    </CardActions>
                </Card>
                <br/>
                <br/>
            </Grid>
        );
    }
}

export default withRouter(Tweet);