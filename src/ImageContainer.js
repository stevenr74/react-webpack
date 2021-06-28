import React, {useState} from 'react'
import ImagePicker from 'react-image-picker'
//const images = require.context('../public/images', true);

const ImageContainer = ({ data, getSelections }) => {
    const [images, setImage] = useState([]);
    var games = [];

    
    //Creates an array containing image urls
    //Could limit display by changing length to a fixed number eg 5
    for (var j = 0; j < 5; j++){
        games[j] = './public/images/' + data[j].img;
    }

    const onPick = (images) => {
      setImage({images});
    }


    return (
        <div>
          <ImagePicker 
            images={games.map((image, i) => ({src: image, value: i}))}
            onPick={onPick}
            multiple
          />
          <button type="button" onClick={() => getSelections(images)}>Submit</button>
        </div>
    )
    
};

export default ImageContainer;