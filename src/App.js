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
// add games to db  - use a pk for identiy instead of generating one in imagecontainer
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

  //create a sql query based on recieved values
  const recommend = () => {
    //multiple genres can come in, so we need to identify all possible genre matches then proceed
    var selectedGames = [];
    const values = Object.values(selections)
    const input = values[0];

    console.log(input);
    
    for (var imgInfo in input){
      console.log(imgInfo);
    }

    return (`select * from gamesToRecommend`)
  }

    
  return (
      
      <div className="app">
            {data.length ? <ImageContainer data={data} getSelections={getSelections}/> : <h1>Loading...</h1>}
            {selections ? recommend() : null}
      </div>
  );
}

export default App;