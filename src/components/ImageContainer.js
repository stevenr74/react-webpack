import React, {useState, useRef, useEffect} from 'react'
import ImagePicker from 'react-image-picker'

const ImageContainer = ({ data, getSelections, renderButton}) => {

  const [images, setImage] = useState([]);

  const initImages = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  const ref = useRef(null);

  const onPick = (images) => {
    setImage({images});
  }

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
 
  useEffect(() => {
    if(renderButton == false){
      window.scrollTo({
        top: document.body.scrollHeight - ref.current.clientHeight, 
        left: 0,
        behavior: 'smooth'
      });
    }
  })


  try {
    return (
        <div ref={ref}>
          <ImagePicker 
            images={data.map((values) => ({src: initImages[values.img].default, value: values}))}
            onPick={onPick}
            multiple
          />
          {renderButton ? <button type="button" onClick={() => { getSelections(images) } }>Submit</button> : null}
        </div>
      )
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default ImageContainer;
