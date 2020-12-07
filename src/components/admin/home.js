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

    getRegisterations = () => {
        this.setState({
            isLoading: true
        })
        axios.get(DATA_API, { headers: { Authorization: "Bearer " + localStorage.getItem("user-token") } }).then(res => {
            let registerations = [];

            if (res.status === 200) {
                registerations = res.data.registerations;
            } else if (res.status === 401) {
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

    handleLogin = (username, password) => {
        this.setState({
            isLoading: true
        })
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
        let token = localStorage.getItem("user-token");
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
                {this.state.loggedIn ?
                    <RegisterationDetails isLoading={this.state.isLoading} registerations={this.state.registerations} /> :
                    <AdminLogin error={this.state.error} isLoading={this.state.isLoading} handleLogin={this.handleLogin} />}
            </div>
        )
    }
}