import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import TweetService from "./TweetService";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";

class InsertTweet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        };
    }

    render() {
        return (
            <Grid item xs={12} md={12}>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth/>
                    <br/>
                    <br/>
                    <TextField
                        id="outlined-textarea"
                        label="Tweet"
                        placeholder={"Your tweet"}
                        multiline
                        rows={7}
                        variant="outlined"
                        fullWidth
                    />
                </form>
            </Grid>
        );
    }
}

export default withRouter(InsertTweet);