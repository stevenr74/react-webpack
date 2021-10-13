import React from 'react'
import { faSync, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = (props) => {
    const {refreshPage, info} = props;

    return (
        <div className="title">
            <FontAwesomeIcon icon={faQuestionCircle} className="shuffle" onClick={info}/>
            <FontAwesomeIcon icon={faSync} className="shuffle" onClick={refreshPage}/>
            <h1>Game Recommender</h1>
        </div>
    )
}

export default Title;