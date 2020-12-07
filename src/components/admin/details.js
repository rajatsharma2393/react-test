import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CSVLink } from "react-csv";
import Loader from 'react-loader-spinner'
import "./../../assets/styles/admin.css"


export default class RegisterationDetails extends Component {

    constructor(props) {
        super(props);
        this.headings = ["First Name", "Last Name", "Email", "Phone No.", "Date", "Time"];

    }

    // Formatted date and time to show in table
    getDateTime = (date) => {
        let index = date.indexOf("T");
        let dt = date.substring(0, index);
        let timePart = date.substring(index + 1);
        let timeSplitted = timePart.split(":");
        let hr = +timeSplitted[0];
        let min = +timeSplitted[1];
        let time = "";
        if (hr >= 12) {
            time = hr + ":" + min + " PM";
        } else {
            time = hr + ":" + min + " AM";
        }
        return [dt, time];
    }

    // TAble view of all the registeration content
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
                        {this.props.registerations.map((row) => (

                            <TableRow key={row.firstName + row.lastName + row.visitDate + row.visitTime}>
                                <TableCell align="center">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phoneNumber}</TableCell>
                                <TableCell align="center">{this.getDateTime(row.date)[0]}</TableCell>
                                <TableCell align="center">{this.getDateTime(row.date)[1]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    componentDidMount() {

    }

    getCsvData = () => {
        let data = [];
        this.props.registerations.forEach((reg) => {
            data.push(Object.values(reg));
        });
        return [this.headings, ...data];
    }

    render() {
        return (

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
                {this.props.isLoading && (
                    <div className="loader-div">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={30}
                            width={30}

                        /></div>
                )}
                <CSVLink data={this.getCsvData()}
                    filename={"registerations.csv"}
                    className="export-btn"
                    disabled={this.props.isLoading}>Export as CSV</CSVLink>
            </div>

        )
    }
}
