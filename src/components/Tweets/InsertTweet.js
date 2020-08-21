import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TweetService from "./TweetService";
import Alert from "@material-ui/lab/Alert";
import AuthService from "../service/AuthService";

class InsertTweet extends Component {

    emptyItem = {
        title: '',
        post: '',
        user: AuthService.getLoggedInUser().user_id
    };

    constructor(props) {
        super(props);
        this.state = {
            tweet: this.emptyItem,
            alertMessage: "",
            showAlert: false,
            hasError: false,
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

        if (!tweet.title || !tweet.post) {
            this.setState({
                hasError: true,
                alertMessage: "Title and post are mandatory"
            });
            this.onShowAlert();
            return;
        }

        TweetService.addTweet(tweet).catch(error => {
                console.log(error.response.data.ErrorMessage);
                this.setState({
                    hasError: true,
                    alertMessage: "Error, try again"
                });
                this.onShowAlert()
            }
        ).then(response => {
            this.props.handler();
            this.setState({
                hasError: false,
                alertMessage: "Added",
                tweet:this.emptyItem
            });
            this.onShowAlert();
        });
    }

    onShowAlert = () => {
        this.setState({showAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({showAlert: false})
            }, 3000)
        });
        this.props.history.replace({state: undefined});
    };

    render() {
        const {tweet} = this.state;

        return (
            <Grid item xs={12} md={12}>

                {this.state.hasError === true && this.state.showAlert &&
                <Alert severity="error">{this.state.alertMessage}</Alert>}

                {this.state.hasError === false && this.state.showAlert &&
                <Alert severity="success">{this.state.alertMessage}</Alert>}

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