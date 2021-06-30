import React, { useEffect, useState } from 'react';
import { createDbWorker } from "sql.js-httpvfs";
import ImageContainer from './ImageContainer';

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
    
      return await worker.db.query(`select * from gamesToRecommend`);
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

  //recommends second row of games
  //so probably just get keywords eg genre and rating and then preform a search using those filters
  //pre-generate possible SQL queries to prevent injection
  const recommend = (input) => {
    //multiple genres can come in, so we need to identify all possible genre matches then generate a imagecontainer
    //and users shouldn't be recommended games they selected
    if(input.images){
      (input.images).forEach(function(item){
        
        console.log(item.value);
        
        //so loop through data and find games that match genre, have a high rating, and haven't been selected

      });
      
    }else {
      //if images don't exist
    }
    return (`select * from gamesToRecommend`)
  }
    
  return (
      
      <div className="app">
            {data.length ? <ImageContainer data={data} getSelections={getSelections}/> : <h1>Loading...</h1>}
            {selections ? recommend(selections) : null}
      </div>
  );
}

export default App;