import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CSVLink, CSVDownload } from "react-csv";

import axios from "axios";
import { DATA_API } from "./../../common/constants"
import "./../../assets/styles/admin.css"


class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.headings = ["First Name", "Last Name", "Email", "Phone No.", "Date", "Time"]
        this.state = {
            registerations: [],
            isLoading: true
        }

    }

    getRegisterationContent = () => {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {this.headings.map(heading => {
                                return (<TableCell align="center">{heading}</TableCell>);
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.registerations.map((row) => (
                            <TableRow key={row.firstName + row.lastName + row.visitDate + row.visitTime}>
                                <TableCell align="center">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phoneNo}</TableCell>
                                <TableCell align="center">{row.visitDate}</TableCell>
                                <TableCell align="center">{row.visitTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    componentDidMount() {
        axios.get(DATA_API).then(res => {
            let registerations = [];
            if (res.status === 200) {
                registerations = res.data.registerations;
            }
            this.setState({
                registerations,
                isLoading: false
            })
        })
    }

    getCsvData = () => {
        let data = [];
        console.log(this.state.registerations);
        this.state.registerations.forEach((reg) => {
            data.push(Object.values(reg));
        });
        return [this.headings, ...data];
    }

    render() {
        if (!this.props.checkAdminLogin()) {
            return <Redirect to="/admin-login" />
        }
        return (
            <div className="admin">
                <div className="back-btn">
                    <Button
                        onClick={() => this.props.history.goBack()}
                        fullWidth
                        variant="contained"
                        color="primary"

                    >
                        {"< Go back"}</Button>
                </div>
                <div className="registerations-table">
                    <Typography component="h1" variant="h4">
                        Admin Challa-ahoy
                </Typography>
                    <Typography component="h1" variant="h5">
                        Registeration Details
                    </Typography>
                    <div className="table-div">
                        {this.getRegisterationContent()}
                    </div>
                    <br />
                    {!this.state.isLoading && <CSVLink data={this.getCsvData()}
                        filename={"my-file.csv"}
                        className="export-btn">Export as CSV</CSVLink>}
                </div>

            </div>
        )
    }
}
export default withRouter(AdminHome);