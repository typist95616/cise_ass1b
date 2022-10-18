import React from 'react';
import { Component } from 'react';
import WaitingAnalyseList from '../../components/WaitingAnalyseList/WaitingAnalyseList';
import './AnalyseListPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

class AnalyseListPage extends Component{
    render(){
        return(
            <div>
                <div className="title">
                    <FontAwesomeIcon icon={faCode} /> Analyse List Page
                </div>
                <div className="waitingAnalyseList">
                    <WaitingAnalyseList />
                </div>
            </div>
        )
    }
}

export default AnalyseListPage;