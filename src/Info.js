import React from 'react'

const Info = (props) => {
    return (
        <div className="info">
            <h2>How to use Game Recommender</h2>
            <p>Select some games that you've played before and press submit.
                If you don't see any games that you've played, press the reroll button in the top left.
                Game recommendations are based on genres and review scores.
            </p>
        </div>
    )
}

export default Info;