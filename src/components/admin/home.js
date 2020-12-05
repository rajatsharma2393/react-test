import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

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
        console.log(this.props.history);
        return (
            <div>
                kjdsnxc
            </div>
        )
    }
}
export default withRouter(AdminHome);