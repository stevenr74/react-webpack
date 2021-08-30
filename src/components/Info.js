import React from 'react'

const Info = (props) => {
    return (
        <div className="info">
            <h2>How to use Game Recommender</h2>
            <p>Select some games that you like and press submit.
                If you don't see any games you like, press the shuffle button in the top left to get a different game set.
                Game recommendations are based on genres and review scores.
            </p>
        </div>
    )
}

export default Info;