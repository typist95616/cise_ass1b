import React, { Component } from 'react';
import './ModerationListPage.css'
import '../../components/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

import WaitingList from '../../components/WaitingModerationList/WaitingModerationList';

class ModerationListPage extends Component{
    render(){
        return(
            <div>
                <div className="title">
                    <FontAwesomeIcon icon={faCode} /> Waiting Moderation Page
                </div>
                <div className="WaitingList">
                    <WaitingList/>
                </div>
            </div>
        )
    }
}

export default ModerationListPage;
