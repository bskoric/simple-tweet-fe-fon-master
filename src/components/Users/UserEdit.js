import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class UserEdit extends Component {

    render() {
        const {user} = this.props;

        const form = {
            width: '100%',
            marginTop: 20
        };

        const submit = {
            marginTop: 24,
            marginBottom: 16
        };

        return (
            <div>
                <Grid container spacing={5}>

                    <Grid item xs={12} sm={6}>
                        <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>Change personal data</p>

                        <form style={form} noValidate method="post">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="first_name"
                                        name="first_name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="first_name"
                                        label="First Name"
                                        autoFocus
                                        value={user.first_name || ''}
                                        onChange={this.props.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="last_name"
                                        label="Last Name"
                                        name="last_name"
                                        autoComplete="lastname"
                                        value={user.last_name || ''}
                                        onChange={this.props.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        value={user.username || ''}
                                        onChange={this.props.handleChange}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={user.email || ''}
                                        onChange={this.props.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.props.handleSubmit}
                                style={submit}
                            >
                                Change data
                            </Button>
                        </form>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <p style={{fontFamily: "Lemonada", color: "rgb(50 73 106)"}}>Change password</p>

                        <form style={form} noValidate method="post">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="oldPassword"
                                        label="Old password"
                                        type="password"
                                        id="oldPassword"
                                        autoComplete="current-password"
                                        onChange={this.props.handlePasswordChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="newPassword"
                                        label="New password"
                                        type="password"
                                        id="newPassword"
                                        onChange={this.props.handlePasswordChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField sm={6}
                                               variant="outlined"
                                               required
                                               fullWidth
                                               name="repeatPassword"
                                               label="Repeat new password"
                                               type="password"
                                               id="repeatPassword"
                                               onChange={this.props.handlePasswordChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.props.handlePasswordChangeSubmit}
                                style={submit}
                            >
                                Change password
                            </Button>
                        </form>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default UserEdit;