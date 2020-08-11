import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

class Tweet extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const tweet = this.props;
        const {title, post} = tweet;

        return (
            <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Divider/>
                <div>
                    {post}
                </div>
                <br/>
                <br/>
            </Grid>
        );
    }
}

export default withRouter(Tweet);