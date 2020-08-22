import React, {Component} from "react";
import UserEdit from "../Users/UserEdit";
import AuthService, {USER_SESSION_ATTRIBUTE_NAME, USERNAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthService";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import UserService from "../Users/UserService";

class UserPage extends Component {

    emptyPasswordObject = {
        username: AuthService.getLoggedInUser().username,
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            alertMessage: "",
            showAlert: false,
            hasError: false,
            user: {},
            password: {}
        };

        this.handleEditFormChange = this.handleEditFormChange.bind(this);
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordChangeSubmit = this.handlePasswordChangeSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: AuthService.getLoggedInUser(),
            password: this.emptyPasswordObject
        })
    }

    handleEditFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }

    handleEditFormSubmit(event) {
        event.preventDefault();
        const {user} = this.state;

        if (!user.email || !user.first_name || !user.last_name) {
            this.setState({
                hasError: true,
                alertMessage: "All fields are mandatory!"
            });
            this.onShowAlert();
            return;
        }

        UserService.updateUser(user).catch(error => {
            console.log(error.response.data);
            this.setState({
                hasError: true,
                alertMessage: "Error while updating data !",
            });
            this.onShowAlert();
        })
            .then(response => {
                this.setState({
                    hasError: false,
                    alertMessage: "Data is updated !",
                });
                this.onShowAlert();
                sessionStorage.setItem(USER_SESSION_ATTRIBUTE_NAME, JSON.stringify(user));
            });
    }

    handlePasswordChange(event) {
        const target = event.target;
        const name = target.name;
        let password = {...this.state.password};
        password[name] = window.btoa(target.value);
        this.setState({password});
    }

    handlePasswordChangeSubmit(event) {
        event.preventDefault();
        const passwordObject = this.state.password;

        if (passwordObject.newPassword !== passwordObject.repeatPassword) {
            this.setState({
                hasError: true,
                alertMessage: "New passwords don't match",
                password: this.emptyPasswordObject
            });
            this.onShowAlert();
            return;
        }

        if (!passwordObject.oldPassword || !passwordObject.newPassword) {
            this.setState({
                hasError: true,
                alertMessage: "Please insert all fields",
                password: this.emptyPasswordObject
            });
            this.onShowAlert();
            return;
        }

        UserService.passwordChange(passwordObject.username, passwordObject.oldPassword, passwordObject.newPassword).catch(error => {
            console.log(error.response.data);
            this.setState({
                hasError: true,
                alertMessage: "Error while changing password. Check if your old password is correct !",
            });
            this.onShowAlert();
        })
            .then(response => {
                this.setState({
                    hasError: false,
                    alertMessage: "Password is changed!",
                });
                this.onShowAlert();
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
        const {user} = this.state;
        return (
            <>
                <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>My profile
                    - {user.first_name} {user.last_name} [{user.username}]</p>

                <Divider/>

                {this.state.hasError === true && this.state.showAlert &&
                <Alert severity="error">{this.state.alertMessage}</Alert>}

                {this.state.hasError === false && this.state.showAlert &&
                <Alert severity="success">{this.state.alertMessage}</Alert>}
                <UserEdit user={user}
                          handleChange={this.handleEditFormChange}
                          handleSubmit={this.handleEditFormSubmit}
                          handlePasswordChange={this.handlePasswordChange}
                          handlePasswordChangeSubmit={this.handlePasswordChangeSubmit}/>
            </>
        );
    }
}

export default UserPage;