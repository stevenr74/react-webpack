import React, {useState, useRef} from 'react'
import ImagePicker from 'react-image-picker'

const ImageContainer = ({ data, getSelections, renderButton}) => {

  const [images, setImage] = useState([]);

  const initImages = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  const clickRef = useRef();

  const onPick = (images) => {
    setImage({images});
  }

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


  function handleClick() {
    clickRef.current.scrollIntoView({ behavior: 'smooth' });
  }


  try {
    return (
        <div>
          <ImagePicker 
            images={data.map((values) => ({src: initImages[values.img].default, value: values}))}
            onPick={onPick}
            multiple
          />
          {renderButton ? <div ref={clickRef}></div> : null}
          {renderButton ? <button type="button" onClick={() => { getSelections(images); handleClick(); } }>Submit</button> : null}
        </div>
      )
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default ImageContainer;
