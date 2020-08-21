import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import UserService from "../Users/UserService";
import Users from "../Users/Users";
import Divider from "@material-ui/core/Divider";
import AuthService from "../service/AuthService";
import Alert from "@material-ui/lab/Alert";

class FriendsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            alertMessage: "",
            showAlert: false,
            hasError: false,
        };

        this.getFriends = this.getFriends.bind(this);
    }

    componentDidMount() {
        this.getFriends();
    }

    getFriends() {
        UserService.getFriends(AuthService.getLoggedInUser().user_id).then(res => {
            this.setState({
                users:res.data
            })
        });
    }

    unfriend = (friend_id) => {
        const user_id = AuthService.getLoggedInUser().user_id;
        UserService.removeFriend(user_id, friend_id).then(res => {
                this.getFriends();
                this.setState({
                    hasError: false,
                    alertMessage: "Removed from friend's list",
                });
                this.onShowAlert()
            }
        ).catch(
            this.setState({
                hasError: true,
                alertMessage: "Error, try again !",
            })
        );
    };

    onShowAlert = () => {
        this.setState({showAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({showAlert: false})
            }, 2000)
        });
    };

    render() {
        return (
            <React.Fragment>

                <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>Followed people</p>

                <Divider/>

                {this.state.hasError === true && this.state.showAlert &&
                <Alert severity="error">{this.state.alertMessage}</Alert>}

                {this.state.hasError === false && this.state.showAlert &&
                <Alert severity="success">{this.state.alertMessage}</Alert>}

                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <div className={"userList"}>
                            <Users users={this.state.users} action={this.unfriend} actionName={"Unfriend"}/>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default FriendsPage;