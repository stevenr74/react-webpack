import React, {useState} from 'react'
import ImagePicker from 'react-image-picker'

const ImageContainer = ({ data, getSelections }) => {

    const [images, setImage] = useState([]);

    const onPick = (images) => {
      setImage({images});
    }

    return (
        <div>
          <ImagePicker 
            images={data.map((values) => ({src: ('./public/images/' + values.img), value: values}))}
            onPick={onPick}
            multiple
          />
          <button type="button" onClick={() => getSelections(images)}>Submit</button>
        </div>
    )
};

export default ImageContainer;