import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TweetService from "./TweetService";

class InsertTweet extends Component {

    emptyItem = {
        title: '',
        post: '',
        user: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            tweet: this.emptyItem,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tweet = {...this.state.tweet};
        tweet[name] = value;
        this.setState({tweet});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {tweet} = this.state;
        console.log("Brankooo");
        console.log(tweet);

        TweetService.addTweet(tweet).catch( error => {
                /*            this.props.history.push({
                                pathname: '/',
                                state: {hasError: true, message: "Error while adding: "+error.response.data.ErrorMessage}
                            })}*/
                console.log(error.response.data.ErrorMessage);
            }
        ).then( response =>{
            this.props.handler();
            this.props.history.push({
                pathname: '/',
                state: {hasError: false, message: "Successfully added"}
            })});
    }

    render() {
        const {tweet} = this.state;

        return (
            <Grid item xs={12} md={12}>
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
                </form>
            </Grid>
        );
    }
}

export default withRouter(InsertTweet);