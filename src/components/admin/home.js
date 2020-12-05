import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {Redirect} from "react-router";

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerations:[],
            isLoading:true
        }
        
    }


    componentDidMount() {

    }

    render() {
        if(!this.props.checkAdminLogin()) {
            return <Redirect to="/admin-login" />
        }
        return (
            <div>
                kjdsnxc
            </div>
        )
    }
}
export default withRouter(AdminHome);