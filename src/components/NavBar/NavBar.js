import React, { Component } from 'react';
import './NavBar.css';
import '../Styles.css';

class NavBar extends Component{
    render(){
        return(
            <nav>
                <div className='nav-title'>
                    <h2>SPEED Articles System</h2>
                </div>
                <div className='nav-content'>
                    <ul>
                        <li>Suggest Articles</li>
                        <li>Moderate Articles</li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;
