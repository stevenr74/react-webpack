import React from 'react'
import { Shuffle, Info, ArrowCounterClockwise } from 'phosphor-react'

const Title = (props) => {
    const {refreshPage, info} = props;

    return (
        <div className="title">
            <Info color="white" size={32} className="shuffle" onClick={info}/>
            <ArrowCounterClockwise color="white" size={32} className="shuffle" onClick={refreshPage}/>
            <h1>Game Recommender</h1>
        </div>
    )
}

export default Title;