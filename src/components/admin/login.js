import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import "./../../assets/styles/login.css"
import { withRouter } from 'react-router-dom';
import axios from "axios";
import {LOGIN_API} from "./../../common/constants"
import {Redirect} from "react-router";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {}
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

    handleLogin = async(data) => {
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        let { username,
            password} = this.state;

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
        axios.post(LOGIN_API,{username,password}).then(res=>{
            if(res.status!=200) {
                let {errors} = res.data.errors;
                this.setState({
                    errors
                })
            } else {
                localStorage.setItem("user-token",res.data.token);
                this.props.history.replace("admin");
            }
        })
        this.setState({
             username: "",
            password: "",
            errors: {}
        })
        
    }
    render() {
        if(this.props.checkAdminLogin()) {
            return <Redirect to="/admin" />
        }
        return (
            <div className="admin">
                <div className="back-btn">
                    <Button
                        onClick={()=>this.props.history.goBack()}
                        fullWidth
                        variant="contained"
                        color="primary"

                    >
                        {"< Go back"}</Button>
                </div>
                <Container component="div" className="visitorDetails main-content" maxWidth="xs">
                    <Typography component="h1" variant="h4">
                        Admin Challa-ahoy
                </Typography>
                    <br />
                    <Typography component="h1" variant="h5">
                        Admin Details
                    </Typography>
                    <div>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Username"
                                        autoFocus
                                        value={this.state.username}
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.username && (<span className="error">{this.state.errors.username}</span>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        onChange={this.valueOnChange}
                                        value={this.state.password}
                                    />
                                    {this.state.errors.password && (<span className="error">{this.state.errors.password}</span>)}
                                </Grid>
                               
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                Login
                        </Button>

                        </form>
                    </div>

                </Container>
            </div>
        );
    }
}

export default withRouter(AdminLogin);