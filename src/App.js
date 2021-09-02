import React, { useEffect, useState, useRef } from 'react';
import ImageContainer from './components/ImageContainer';
import Title from './components/Title';
import Results from './components/Results';
import Info from './components/Info';
import {load, selectGenres} from './db/GetData.js';


export function App() {
  const [data, setData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [results, setResults] = useState([]);
  const [about, setAbout] = useState(false);
  const isInitialMount = useRef(true);

  const retrieveData = async() => {
      try {
          var response = await load();
          setData(response);
      } catch(error){
          console.log(error);
      }
  };
  
  //on mount
  useEffect(() => {
    retrieveData();
  }, []);
  
  //on selection change
  useEffect(()=> {
    if(isInitialMount.current){
      isInitialMount.current = false;
    } else {
      retrieveResults();
    }
  }, [selections]);

  //on selection
  const getSelections = (pics) => {
    setSelections(pics)
  }
  
  const retrieveResults = async() => {
    try {
      var resulting = await selectGenres(selections);
      var removes = [];
      
      //resulting contains genre matches, so filter out any selections
      resulting.forEach(element => {
        selections.images.forEach(picked => {
          if(element.title == picked.value.title){
            removes.push(element);
          }
        });
      });
      removes.forEach(remove => {
        var index = resulting.indexOf(remove);
        if(index > -1){
          resulting.splice(index, 1);
        }
      });
      
      setResults(resulting)
    } catch {
      console.log(error);
    }
  }

  function refreshPage(){
    window.location.reload();
  }

  function infoToggle(){
    if(about == false){
      setAbout(true);
    } else {
      setAbout(false);
    }
  }

  return (
      <div className="app">
            <Title refreshPage={refreshPage} info={infoToggle} />
            {about ? <Info></Info> : null}
            {data.length ? <ImageContainer data={data} getSelections={getSelections} renderButton={true}/> : null}
            {results.length ? <Results /> : null}
            {results.length ? <ImageContainer data={results} getSelections={null} renderButton={isInitialMount.current}/>: null}
      </div>
  );
}

export default App;