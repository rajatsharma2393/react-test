import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {Redirect} from "react-router";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {DATA_API} from "./../../common/constants"
import "./../../assets/styles/admin.css"


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerations:[],
            isLoading:true
        }
        
    }

    getRegisterationContent = () => {
        return (
            <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell  align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone No.</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.registerations.map((row) => (
                            <TableRow key={row.firstName+row.lastName}>
                            <TableCell  align="center">
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
        axios.get(DATA_API).then(res=>{
            let registerations = [];
            if(res.status===200) {
                registerations = res.data.registerations;
            }
            this.setState({
                registerations,
                isLoading:false
            })
        })
    }

    render() {
        if(!this.props.checkAdminLogin()) {
            return <Redirect to="/admin-login" />
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
                <Button
                        onClick={()=>this.props.history.goBack()}
                        
                        variant="contained"
                        color="secondary"

                    >
                        {"Export as CSV"}</Button>
                </div>
                
            </div>
        )
    }
}
export default withRouter(AdminHome);