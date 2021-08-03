import React, {useState} from 'react'
import ImagePicker from 'react-image-picker'

const ImageContainer = ({ data, getSelections, renderButton }) => {

    const [images, setImage] = useState([]);
    const [isPickable, setPickibility] = useState(true);

    console.log('render: ' + renderButton)

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
          {renderButton ? <button type="button" onClick={() => getSelections(images)}>Submit</button> : null}
        </div>
    )
};

export default ImageContainer;
