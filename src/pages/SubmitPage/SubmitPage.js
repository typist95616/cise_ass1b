import React, { Component } from 'react';
import './SubmitPage.css'
import '../../components/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

import SubmitForm from '../../components/SubmitForm/SubmitForm.js';

class SubmitPage extends Component{
    render(){
        return(
            <div>
                <div className="title">
                    <FontAwesomeIcon icon={faCode} /> Submit Page
                </div>
                <div className="SubmitForm">
                    <SubmitForm/>
                </div>
            </div>
        )
    }
}

export default SubmitPage;