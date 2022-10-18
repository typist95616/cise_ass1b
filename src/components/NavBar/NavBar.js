import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to={"/activeArticlesPage"}>
                            <li>Articles Pages</li>
                        </Link>
                        <Link to={"/waitingArticlesPage"}>
                            <li>Waiting Articles Pages</li>
                        </Link>
                        <Link to={"/rejectedArticlesPage"}>
                            <li>Rejected Articles</li>
                        </Link>
                        <li>Suggest Articles</li>
                        <Link to={"/moderationArticlesPage"}>
                            <li>Moderate Articles</li>
                        </Link>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;
