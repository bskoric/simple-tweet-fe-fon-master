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
import AuthService from "../service/AuthService";
import {Redirect} from "react-router-dom";
import {REGISTER_URL} from "../../const/Const";
import Alert from "@material-ui/lab/Alert";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                password: '',
            },
            hasRegisterFailed: false,
            showSuccessMessage: false,
            redirect: false,
            alertMessage: "",
        };
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onShowAlert = () => {
        this.setState({showAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({showAlert: false})
            }, 3000)
        });
    };

    register(e) {
        e.preventDefault();
        const {user} = this.state;

        if (!user.username || !user.email || !user.password || !user.firstname || !user.lastname) {
            this.setState({
                hasRegisterFailed: true,
                alertMessage: "All fields are mandatory!"
            });
            this.onShowAlert();
            return;
        }

        AuthService.register(user, REGISTER_URL).then((response) => {

            this.setState({
                hasRegisterFailed: false,
                alertMessage: "User registered !"
            });
            this.onShowAlert();

            setTimeout(() => {
                this.setState({
                    redirect: true,
                })
            }, 3000);

        }).catch((response) => {
            this.setState({
                hasRegisterFailed: true,
                redirect: false,
                alertMessage: "Can't register user !"
            });
            this.onShowAlert();
            console.log(response)
        })
    }

    onChange(e) {
        const target = e.target;
        let value = e.target.value;
        if (e.target.name === "password") {
            value = window.btoa(e.target.value)
        }
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/login'}/>);
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

                {this.state.hasRegisterFailed === true && this.state.showAlert &&
                <Alert severity="error">{this.state.alertMessage}</Alert>}

                {this.state.hasRegisterFailed === false && this.state.showAlert &&
                <Alert severity="success">{this.state.alertMessage}</Alert>}

                <CssBaseline/>
                <div style={paper}>
                    <Avatar style={avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Simple tweet
                        <hr/>
                        <p style={{textAlign: "center"}}>Sign up</p>
                    </Typography>
                    <form style={form} noValidate method="post">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstname"
                                    name="firstname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="lastname"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.onChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={submit}
                            onClick={this.register}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Register;