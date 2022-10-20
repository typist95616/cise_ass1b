import React, { Component } from 'react';
import './ArticlesPage.css'
import '../../components/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import ArticlesList from '../../components/ArticlesList/ArticlesList';

class ArticlesPage extends Component{
    render(){
        return(
            <div>
                <div className="title">
                    <FontAwesomeIcon icon={faBook} /> Articles List Page
                </div>
                <div className="WaitingList">
                    <ArticlesList/>
                </div>
            </div>
        )
    }
}

export default ArticlesPage;
