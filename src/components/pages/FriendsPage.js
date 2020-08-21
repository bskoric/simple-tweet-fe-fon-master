import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import UserService from "../Users/UserService";
import Users from "../Users/Users";

class FriendsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            users: [],
            showAlert: '',
            hasError: ''
        };

        this.getFriends = this.getFriends.bind(this);
    }

    componentDidMount() {
        this.getFriends();
    }

    getFriends() {
        UserService.getFriends(1).then(res => {
            console.log(res.data)
            this.setState({
                users:res.data
            })
        });
    }

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
                    <Grid item xs={12} md={12}>
                        <div className={"tweetsHomepage"}>
                            <Users users={this.state.users} actionName={"Unfriend"}/>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default FriendsPage;