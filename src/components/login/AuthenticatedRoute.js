import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom'
import AuthService from "../service/AuthService";

class AuthenticatedRoute extends Component {
    render() {
        if (this.props.path === "/login") {
            if (AuthService.isUserLoggedIn()) {
                return <Redirect to="/"/>
            }
            return <Route {...this.props} />
        }

        if (AuthService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute