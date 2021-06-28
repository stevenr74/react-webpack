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


    //passing data
    const getSelections = (pics) => {
      setSelections(pics)
    }

    //recommends second row of games
    const recommend = () => {

    }

    
    return (
        
        <div className="app">
             {data.length ? <ImageContainer data={data} getSelections={getSelections}/> : <h1>Loading...</h1>}
             {selections ? console.log(selections) : "No selections yet"}
        </div>
    );
}

export default App;