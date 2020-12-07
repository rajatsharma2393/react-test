import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import moment from 'moment'
import axios from "axios";
import { DATA_API } from "./../common/constants"
import "./../assets/styles/visitorDetails.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class VisitorRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
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
            phoneNumber,
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
        if (!phoneNumber) {
            errors.phoneNumber = "Field cant be empty";
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

        const dateTime = moment(`${visitDate} ${visitTime}`, 'YYYY-MM-DD HH:mm').format();
        axios.post(DATA_API, {
            firstName,
            lastName,
            email,
            phoneNumber,
            date: dateTime
        });
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            visitDate: "",
            visitTime: "",
            errors: {}
        })
        toast.success(
            "Registeration Successful",
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            }
        );
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
                                        value={this.state.lastName}
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
                                        value={this.state.email}
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.email && (<span className="error">{this.state.errors.email}</span>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type="text"
                                        value={this.state.phoneNumber}
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.phoneNumber && (<span className="error">{this.state.errors.phoneNumber}</span>)}
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
                                        value={this.state.visitDate}
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
                                        value={this.state.visitTime}
                                        onChange={this.valueOnChange}
                                    />
                                    {this.state.errors.visitTime && (<span className="error">{this.state.errors.visitTime}</span>)}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"

                            >
                                Submit
                        </Button>

                        </form>
                    </div>

                </Container>
                <ToastContainer />
            </div>
        );
    }
}

