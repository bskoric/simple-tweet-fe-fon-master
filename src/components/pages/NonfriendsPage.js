import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import UserService from "../Users/UserService";
import Users from "../Users/Users";
import AuthService from "../service/AuthService";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";

class NonfriendsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            followers: [],
            alertMessage: "",
            showAlert: false,
            hasError: false,
        };

        this.getNonFriends = this.getNonFriends.bind(this);
        this.getFollowers = this.getFollowers.bind(this);
    }

    componentDidMount() {
        this.getNonFriends();
        this.getFollowers();
    }

    getNonFriends() {
        UserService.getNonFriends(AuthService.getLoggedInUser().user_id).then(res => {
            this.setState({
                users: res.data
            })
        });
    }

    getFollowers() {
        UserService.getFollowers(AuthService.getLoggedInUser().user_id).then(res => {
            this.setState({
                followers: res.data
            })
        });
    }

    addFriend = (friend_id) => {
        const user_id = AuthService.getLoggedInUser().user_id;
        UserService.addFriend(user_id, friend_id).then(res => {
                this.getNonFriends();
                this.setState({
                    hasError: false,
                    alertMessage: "Friend is added !",
                });
                this.onShowAlert()
            }
        ).catch(
            this.setState({
                hasError: true,
                alertMessage: "Error, try again !",
            })
        )
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
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>Add friends and read their
                            tweets</p>

                        <Divider/>

                        {this.state.hasError === true && this.state.showAlert &&
                        <Alert severity="error">{this.state.alertMessage}</Alert>}

                        {this.state.hasError === false && this.state.showAlert &&
                        <Alert severity="success">{this.state.alertMessage}</Alert>}

                        <div class="addFriendList">
                            <Users users={this.state.users} action={this.addFriend} actionName={"Add friend"}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>Followers</p>

                        <Divider/>

                        <div className={"tweetsHomepage followers"}>
                            <Users users={this.state.followers}/>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default NonfriendsPage;