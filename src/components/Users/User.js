import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import ButtonConfirmDialog from "./ButtonConfirmDialog";

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const user = this.props;
        const {first_name, last_name, username, email} = user;
        const userFullName = first_name + " " + last_name;
        const avatarInitial = first_name.charAt(0) + last_name.charAt(0);

        const avatar = {
            backgroundColor: "rgb(220, 0, 78)",
            width: 56,
            height: 56
        };

        return (
            <div className={""}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar style={avatar} aria-label="recipe">{avatarInitial}</Avatar>
                            }
                            title={username}
                            subheader={""}
                        />
                        <CardContent>
                            <Typography variant="subtitle1" color="textPrimary" className={"tweetTitle"}>
                                <p>
                                    <b>Full name:</b>
                                    <br/>
                                    {userFullName}
                                </p>
                                <p>
                                    <b>Email:</b>
                                    <br/>
                                    {email}
                                </p>
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            {this.props.actionName && this.props.action &&
                            <ButtonConfirmDialog action={this.props.action} actionName={this.props.actionName}/>
                            }
                        </CardActions>
                    </Card>
                    <br/>
                    <br/>
                </Grid>
            </div>
        );
    }
}

export default withRouter(User);