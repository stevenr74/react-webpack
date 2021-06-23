import React, { useEffect, useState } from 'react';
//import { sqljs } from './sql.js'
import { createDbWorker } from "sql.js-httpvfs";
import ImageContainer from './ImageContainer';

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);


export function App() {

    const [data, setData] = useState([]);

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
    
    return (
        
        <div className="app">
             {data.length ? <ImageContainer data={data} /> : <h1>Loading...</h1>}
        </div>
    );
}

export default App;