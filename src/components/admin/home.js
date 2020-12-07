import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from "axios";
import { DATA_API, LOGIN_API } from "./../../common/constants"
import RegisterationDetails from "./details";
import AdminLogin from "./login";

export default class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.headings = ["First Name", "Last Name", "Email", "Phone No.", "Date", "Time"]
        this.state = {
            registerations: [],
            loggedIn: true,
            token: null,
            isLoading: true,
            error: ""
        }

    }

    // Get all registerations data from backend
    getRegisterations = () => {
        this.setState({
            isLoading: true
        })
        axios.get(DATA_API, { headers: { Authorization: "Bearer " + localStorage.getItem("user-token") } }).then(res => {
            let registerations = [];

            if (res.status === 200) {
                registerations = res.data.registerations;
            } else if (res.status === 401) {
                // Unauthorised, meaning our token is invalid, remove it and again login
                localStorage.removeItem("user-token");
                this.setState({
                    isLoading: false,
                    loggedIn: false

                })
                return;
            }
            this.setState({
                registerations,
                isLoading: false
            })
        })
    }

    // Function that will be passed to Login component
    handleLogin = (username, password) => {
        this.setState({
            isLoading: true
        })
        // Call backend api
        axios.post(LOGIN_API, { username, password }).then(res => {
            if (res.status !== 200) {
                let { errors } = res.data.errors;
                this.setState({
                    errors
                })
            } else {
                if (res.data && res.data.success) {
                    this.setState({
                        isLoading: false,
                        loggedIn: true
                    })
                    localStorage.setItem("user-token", res.data.token);
                    this.getRegisterations();
                } else {
                    this.setState({
                        isLoading: false,
                        loggedIn: false,
                        error: "Invalid Credentials"
                    })
                }
            }
        }).catch(e => {
            this.setState({
                isLoading: false,
                loggedIn: false
            })
        })
    }

    componentDidMount() {
        // Check if user token is present in localStorage
        let token = localStorage.getItem("user-token");
        // Token isnt present
        if (!token) {
            this.setState({
                loggedIn: false,
                isLoading: false
            })
            return;
        }
        this.getRegisterations();
    }
    render() {

        return (
            <div className="admin">
                <div className="back-btn">
                    <Button
                        onClick={() => this.props.history.goBack()}
                        fullWidth
                        variant="contained"
                        color="primary"

                    >
                        {"<- Back"}</Button>
                </div>
                {/* Display component based on if admin is logged In */}
                {this.state.loggedIn ?
                    <RegisterationDetails isLoading={this.state.isLoading} registerations={this.state.registerations} /> :
                    <AdminLogin error={this.state.error} isLoading={this.state.isLoading} handleLogin={this.handleLogin} />}
            </div>
        )
    }
}