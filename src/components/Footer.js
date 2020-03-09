import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render(){
        return(
            <footer>
                <div>
                  <Link to='/about'><a>About</a></Link>
                  <Link to='/contact'><a>Contact</a></Link>
                </div>
            </footer>
        )
    }
}

export default Nav;