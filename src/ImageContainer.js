import React from 'react'
import ImagePicker from 'react-image-picker'

//const images = require.context('../public/images', true);

const ImageContainer = ({ data }) => {

    var games = [];

    
    //Creates an array containing image urls
    //Could limit display by changing length to a fixed number eg 5
    for (var j = 0; j < 5; j++){
        games[j] = './public/images/' + data[j].img;
    }

    return (
        <div>
          <ImagePicker 
            images={games.map((image, i) => ({src: image, value: i}))}
            //onPick={this.onPick}
          />
          <button type="button" onClick={() => console.log(this.state.image)}>OK</button>
        </div>
    )
    
};

export default ImageContainer;