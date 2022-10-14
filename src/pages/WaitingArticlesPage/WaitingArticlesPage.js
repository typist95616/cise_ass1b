import React, { Component } from 'react';
import './WaitingArticlesPage.css'
import '../../components/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import WaitingArticlesList from '../../components/WaitArticlesList/WaitingArticlesList.js';

class WaitingArticlesPage extends Component{
    render(){
        return(
            <div>
                <div className="title">
                <FontAwesomeIcon icon={faDatabase} /> Waiting Articles Page
                </div>
                <div className="List">
                    <WaitingArticlesList/>
                </div>
            </div>
        )
    }
}

export default WaitingArticlesPage;
