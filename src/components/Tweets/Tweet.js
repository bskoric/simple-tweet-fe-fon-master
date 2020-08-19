import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";

class Tweet extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const tweet = this.props;
        const {title, post, first_name, last_name, date} = tweet;
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
                        subheader={new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })}
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
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        { this.props.editButton && <IconButton aria-label="Edit" onClick={this.props.editButton}>
                            <EditIcon/>
                        </IconButton> }

                        { this.props.deleteButton && <IconButton aria-label="Delete" onClick={this.props.deleteButton}>
                            <DeleteForeverIcon/>
                        </IconButton> }

                    </CardActions>
                </Card>
                <br/>
                <br/>
            </Grid>
        );
    }
}

export default withRouter(Tweet);