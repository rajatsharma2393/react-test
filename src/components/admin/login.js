import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import "./../../assets/styles/login.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {

            }
        }
    }

    valueOnChange = ({ target }) => {
        let { name, value } = target;
        let errors = this.state.errors;
        errors[name] = "";
        this.setState({
            [name]: value,
            errors
        })
    }





    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        let { username,
            password } = this.state;
        if (!username) {
            errors.username = "Field cant be empty";
        }
        if (!password) {
            errors.password = "Field cant be empty";
        }
        if (Object.keys(errors).length) {
            this.setState({
                errors
            })
            return;
        }
        this.props.handleLogin(username, password);
        this.setState({
            username: "",
            password: "",
            errors: {}
        })

    }
    render() {
        return (

            <Container component="div" className="visitorDetails main-content" maxWidth="xs">
                <Typography component="h1" variant="h4">
                    Admin Challa-ahoy
                </Typography>
                <br />
                <Typography component="h1" variant="h5">
                    Admin Login
                    </Typography>
                <div>
                    <form noValidate onSubmit={this.handleSubmit} data-testid="login-form">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Username"
                                    inputProps={{ "data-testid": "username-input" }}
                                    autoFocus
                                    value={this.state.username}
                                    onChange={this.valueOnChange}
                                />
                                {this.state.errors.username && (
                                    <span className="error" data-testid="username-error">
                                        {this.state.errors.username}</span>)}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    inputProps={{ "data-testid": "password-input" }}
                                    onChange={this.valueOnChange}
                                    value={this.state.password}
                                />
                                {this.state.errors.password && (
                                    <span className="error" data-testid="password-error">
                                        {this.state.errors.password}</span>)}

                                {this.props.error && !this.state.username && !this.state.password && (
                                    <span className="error" data-testid="parent-error">{this.props.error}
                                    </span>)
                                }


                            </Grid>

                        </Grid>


                        <Button
                            type="submit"
                            data-testid="login-btn"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            disabled={this.props.isLoading}
                        >
                            Login
                        </Button>

                    </form>
                    {this.props.isLoading && (
                        <div className="loader-div">
                            <Loader
                                type="Puff"
                                color="#00BFFF"
                                height={30}
                                width={30}

                            /></div>
                    )}

                </div>

            </Container>
        );
    }
}

// admin.username = Admin@01
// admin.password = Password@10