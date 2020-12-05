import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "./../assets/styles/visitorDetails.css"

export default class VisitorRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            visitDate: "",
            visitTime: "",
            errors: {}
        }
    }
    adminBtnClick = () => {
        this.props.history.push("/admin");
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
        let { firstName,
            lastName,
            email,
            phoneNo,
            visitDate,
            visitTime } = this.state;

        if (!firstName) {
            errors.firstName = "Field cant be empty";
        }
        if (!lastName) {
            errors.lastName = "Field cant be empty";
        }
        if (!email) {
            errors.email = "Field cant be empty";
        }
        if (!phoneNo) {
            errors.phoneNo = "Field cant be empty";
        }
        if (!visitDate) {
            errors.visitDate = "Field cant be empty";
        }
        if (!visitTime) {
            errors.visitTime = "Field cant be empty";
        }
        if (Object.keys(errors).length) {
            this.setState({
                errors
            })
            return;
        }
    }
    render() {
        return (
            <div>
                <div className="adminBtn">
                    <Button
                        onClick={this.adminBtnClick}
                        fullWidth
                        variant="contained"
                        color="primary"

                    >
                        Admin</Button>
                </div>
                <Container component="div" className="visitorDetails main-content" maxWidth="xs">
                    <Typography component="h1" variant="h4">
                        Welcome to Challa-ahoy
                </Typography>
                    <br />
                    <Typography component="h1" variant="h5">
                        Visitor Details
                    </Typography>
                    <div>


                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="First Name"
                                        autoFocus
                                        value={this.state.firstName}
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.firstName && (<span className="error">{this.state.errors.firstName}</span>)}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.lastName && (<span className="error">{this.state.errors.lastName}</span>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.email && (<span className="error">{this.state.errors.email}</span>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="phoneNo"
                                        label="Phone Number"
                                        type="number"
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.phoneNo && (<span className="error">{this.state.errors.phoneNo}</span>)}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="visitDate"
                                        label="Date"
                                        type="date"
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.visitDate && (<span className="error">{this.state.errors.visitDate}</span>)}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="visitTime"
                                        label="Time"
                                        type="time"
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.visitTime && (<span className="error">{this.state.errors.visitTime}</span>)}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                Submit
                        </Button>

                        </form>
                    </div>

                </Container>
            </div>
        );
    }
}

