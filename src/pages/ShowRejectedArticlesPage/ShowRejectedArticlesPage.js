import React, { Component } from 'react';
import './ShowRejectedArticlesPage.css'
import '../../components/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import RejectedArticlesList from '../../components/RejectedArticlesList/RejectedArticlesList';

class ShowRejectedArticlesPage extends Component{
    render(){
        return(
            <div>
                <div className="title">
                <FontAwesomeIcon icon={faXmarkCircle} /> Rejected Articles Page
                </div>
                <div className="WaitingList">
                    <RejectedArticlesList/>
                </div>
            </div>
        )
    }
}

export default ShowRejectedArticlesPage;
