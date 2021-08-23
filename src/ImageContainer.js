import React, {useState} from 'react'
import ImagePicker from 'react-image-picker'

const ImageContainer = ({ data, getSelections, renderButton }) => {

    const [images, setImage] = useState([]);
    
    const initImages = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

    const onPick = (images) => {
      setImage({images});
    }

    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
  }


    return (
        <div>
          <ImagePicker 
            images={data.map((values) => ({src: initImages[values.img].default, value: values}))}
            onPick={onPick}
            multiple
          />
          {renderButton ? <button type="button" onClick={() => getSelections(images)}>Submit</button> : null}
        </div>
    )
};

export default ImageContainer;
