import React, { Component } from 'react';
import './ModerationListPage.css'
import '../../components/Styles.css'

import WaitingList from '../../components/WaitingModerationList/WaitingModerationList';

class ModerationListPage extends Component{
    render(){
        return(
            <div>
                <div className="WaitingList">
                    <WaitingList/>
                </div>
            </div>
        )
    }
}

export default ModerationListPage;
