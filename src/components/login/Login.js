import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert'
import AuthService, {USER_SESSION_ATTRIBUTE_NAME, USERNAME_SESSION_ATTRIBUTE_NAME} from "../service/AuthService";
import Redirect from "react-router-dom/es/Redirect";
import {LOGIN_URL} from "../../const/Const";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            redirect: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(e) {
        e.preventDefault();
        const {username} = this.state;
        const {password} = this.state;

        AuthService.login(username, password, LOGIN_URL).then((response) => {
            sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
            sessionStorage.setItem(USER_SESSION_ATTRIBUTE_NAME, JSON.stringify(response.data[0]));

            AuthService.setupAxiosInterceptors(username, password);

            this.setState({showSuccessMessage: true});
            this.setState({hasLoginFailed: false});
            setTimeout(() => {
                this.setState({
                    redirect: true,
                })
            }, 1500);
        }).catch((response) => {
            this.setState({redirect: false});
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true});
        })
    }

    onChange(e) {
        let value = e.target.value;
        if (e.target.name === "password") {
            value = window.btoa(e.target.value)
        }
        this.setState({[e.target.name]: value});
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/'}/>);
        }

        const paper = {
            marginTop: 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        };

        const form = {
            width: '100%',
            marginTop: 8
        };

        const submit = {
            marginTop: 24,
            marginBottom: 16
        };

        const avatar = {
            margin: 8,
            backgroundColor: "rgb(220, 0, 78)"
        };

        return (
            <Container component="main" maxWidth="xs">

                {this.state.showSuccessMessage && !this.state.hasLoginFailed &&
                <Alert severity="success">
                    <b>Successfully logged in!</b>
                </Alert>
                }

                {this.state.hasLoginFailed &&
                <div className="login-alert">Invalid Credentials!</div>
                }

                <CssBaseline/>
                <div style={paper}>
                    <Avatar style={avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Simple tweet
                        <hr/>
                        <p style={{textAlign: "center"}}>Sign in</p>
                    </Typography>
                    <form style={form} noValidate method="post">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={this.onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={submit}
                            onClick={this.login}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Login;
