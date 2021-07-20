import React, { useEffect, useState, useRef } from 'react';
import { createDbWorker } from "sql.js-httpvfs";
import ImageContainer from './ImageContainer';
import Title from './Title';
//import loader from 'sass-loader';
//import { load, selectGenres } from './db/GetData.js';

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

//TODO:
// recommendation logic

export function App() {
  const [data, setData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [results, setResults] = useState([]);

  const isInitialMount = useRef(true);


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
  
  //on mount
  useEffect(() => {
    retrieveData();
  }, []);
  

  //on selection change
  useEffect(()=> {
    if(isInitialMount.current){
      isInitialMount.current = false;
    } else {
      console.log('at useeffect');
      //setSelections();
      retrieveResults();
    }
    //console.log(results);
  }, [selections]);

  const getSelections = (pics) => {
    setSelections(pics)
  }





  //recommends second row of games? should we even have a second row?
  //create prepared sqlite statements that get matches based on genre match (using inner join to create a combined table?)
  //using these matches generate recommendations based on ratings
  //and users shouldn't be recommended games they selected
  /*
  const recommend = async(input) => {
    if(input.images){
      (input.images).forEach(function(item){
        //create a parameterized query eg SELECT * from games 
        var subgenre = item.value.subgenre;
        console.log(subgenre);
        //var sql_statement = 'SELECT * FROM games INNER JOIN subgenres on subgenres.name = games.subgenre WHERE subgenres.genre = '
        //retrieveResults();
      });
      await retrieveResults();
      console.log(results[0]);
    }
    else {
    }
    return 0;
  }
  */
  
  
  const retrieveResults = async() => {
    try {
      var resulting = await selectGenres();
      //console.log(resulting);
      setResults(resulting)
    } catch {
      console.log(error);
    }
  }
  
  async function selectGenres() {
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

    return await worker.db.query(`SELECT title,rating,mode, games.img, games.subgenre, genres.genre FROM games INNER JOIN subgenres on subgenres.subgenre = games.subgenre INNER JOIN genres on genres.genre = subgenres.genre WHERE genres.genre = 'RPG'`);
  }
  


  return (
              //maybe just use the first 5 or 6 values from data for the initial imagecontainer
      <div className="app">
            <Title />
            {data.length ? <ImageContainer data={data} getSelections={getSelections}/> : null}
            {results.length ? <ImageContainer data={results} getSelections={getSelections}/>: null}
      </div>
  );
}

export default App;