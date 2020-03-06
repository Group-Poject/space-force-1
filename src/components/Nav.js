import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleDropdown: false
        }
    }
    render(){
        return(
            <nav>
                <div className='icons'>
                    <i className="fas fa-clinic-medical"></i>
                    <i className="fas fa-ambulance"></i>
                </div>
                <div>
                    <p>Hello, first_name.</p>
                    <i className="fas fa-bars" onClick={() => this.setState({toggleDropdown: !this.state.toggleDropdown})}></i>
                    {this.state.toggleDropdown ? <div className='dropdown'>
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/meds'>Medications</Link>
                        <Link to='/allergies'>Allergies</Link>
                        <Link to='/surgeries'>Surgeries</Link>
                        <Link to='/med-history'>Medical History</Link>
                        <Link to='/calendar'>Calendar</Link>
                        <Link to='/pcare'>Primary Care Physician</Link>
                        <Link to='/profile'>Profile</Link>
                        {/* <Link to='/logout'>Logout</Link> */}
                    </div> : null}
                </div>
            </nav>
        )
    }
}

export default Nav;