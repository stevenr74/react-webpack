import React, { useEffect, useState } from 'react';
import { createDbWorker } from "sql.js-httpvfs";
import ImageContainer from './ImageContainer';
import Title from './Title';
//import loader from 'sass-loader';

//import GetData from './db/GetData'


const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

//TODO:
// recommendation logic
// separate db logic from app

export function App() {

  const [data, setData] = useState([]);

  const [selections, setSelections] = useState([]);

  const [results, setResults] = useState([]);


  //one solution is to include a query when calling load - finding the right data
  
  async function load() {
      const worker = await createDbWorker(
        [
          {
            from: "inline",
            config: {
              serverMode: "full",
              url: "/games.db",
              requestChunkSize: 4096,
            },
          },
        ],
        workerUrl.toString(),
        wasmUrl.toString()
      );
    
      return await worker.db.query(`select * from games`);
  }
  
  
  const retrieveData = async() => {
      
      try {
          var response = await load();
          setData(response);
      } catch(error){
          console.log(error);
      }
  };
  

  useEffect(() => {
      retrieveData();
  }, []);

  useEffect(()=> {
    setSelections();
  }, [selections]);


  //getting which pics were selected
  const getSelections = (pics) => {
    setSelections(pics)
  }

  //recommends second row of games? should we even have a second row?
  //create prepared sqlite statements that get matches based on genre match (using inner join to create a combined table?)
  //using these matches generate recommendations based on ratings


  const recommend = (input) => {
    //and users shouldn't be recommended games they selected
    if(input.images){
      (input.images).forEach(function(item){
        
        console.log(item.value);
        
        //so loop through data and find games that match genre, have a high rating, and haven't been selected

      });
      
    }else {
      //if images don't exist
    }
    return 0;
    //return (`select * from gamesToRecommend`)
  }
    
  return (
              //maybe just use the first 5 or 6 values from data for the initial imagecontainer
              //{results ? <ImageContainer data={data} getSelections={getSelections}/> : null}
      <div className="app">
            <Title />
            {data.length ? <ImageContainer data={data} getSelections={getSelections}/> : <h1>Loading...</h1>}
            {selections ? recommend(selections) : null}
      </div>
  );
}

export default App;