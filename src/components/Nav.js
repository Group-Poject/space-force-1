import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Nav extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleDropdown: false,
            // body: document.getElementsByTagName('body'),
        }
    }
    render(){
        console.log(this.props);
        
        // this.state.body.onclick = this.setState({toggleDropdown: false})
        return(
            <nav>
                <div className='icons'>
                    <Link to='/dashboard' ><i className="fas fa-clinic-medical"></i></Link>
                    <Link to='/first-responder' ><i className="fas fa-ambulance"></i></Link>
                </div>
                <div>
                    <p>{this.props.userReducer.user.first_name ? `Hello, ${this.props.userReducer.user.first_name}.` : 'Hello'}</p>
                    <i className="fas fa-bars" onClick={() => this.setState({toggleDropdown: !this.state.toggleDropdown})}></i>
                    {this.state.toggleDropdown ? <div className='dropdown'>
                        <Link to='/dashboard' onClick={() => this.setState({toggleDropdown: false})}>Dashboard</Link>
                        <Link to='/meds' onClick={() => this.setState({toggleDropdown: false})}>Medications</Link>
                        <Link to='/allergies' onClick={() => this.setState({toggleDropdown: false})}>Allergies</Link>
                        <Link to='/surgeries' onClick={() => this.setState({toggleDropdown: false})}>Surgeries</Link>
                        <Link to='/med-history' onClick={() => this.setState({toggleDropdown: false})}>Medical History</Link>
                        <Link to='/calendar' onClick={() => this.setState({toggleDropdown: false})}>Calendar</Link>
                        <Link to='/primary-care' onClick={() => this.setState({toggleDropdown: false})}>Primary Care Physician</Link>
                        <Link to='/profile' onClick={() => this.setState({toggleDropdown: false})}>Profile</Link>
                        {/* <Link to='/logout'>Logout</Link> */}
                    </div> : null}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, null)(Nav);