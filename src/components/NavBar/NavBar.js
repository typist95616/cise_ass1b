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
                        <Link to={"/Submit"}>
                            <li>Suggest Articles</li>
                        </Link>
                        <Link to={"/activeArticlesPage"}>
                            <li>Articles Pages</li>
                        </Link>
                        <Link to={'/search'}>
                            <li>Search</li>
                        </Link>
                        <Link to={"/waitingArticlesPage"}>
                            <li>Waiting Articles Pages</li>
                        </Link>
                        <Link to={"/rejectedArticlesPage"}>
                            <li>Rejected Articles</li>
                        </Link>
                        <Link to={"/AnalyseList"}>
                            <li>Analyse Articles</li>
                        </Link>
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
