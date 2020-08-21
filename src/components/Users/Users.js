import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import User from "./User";

class Users extends Component {

    render() {
        const users = this.props.users;
        return (
            <>
                {users.map(user => (
                    <User {...user} key={user.friend_id} actionName={this.props.actionName}/>
                ))}
            </>
        );
    }
}

export default withRouter(Users);