import React, { Component } from 'react';
import './Styles.css';

class NavBar extends Component{
    render(){
        return(
            <nav>
                <div>
                    <h1>Moderation Page</h1>
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
