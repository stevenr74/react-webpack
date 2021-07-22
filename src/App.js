import React, { useEffect, useState, useRef } from 'react';
import { createDbWorker } from "sql.js-httpvfs";
import ImageContainer from './ImageContainer';
import Title from './Title';

//import { load, selectGenres } from './db/GetData.js';

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

export function App() {
  const [data, setData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [results, setResults] = useState([]);

  const isInitialMount = useRef(true);

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
    
      return await worker.db.query(`SELECT title, rating, mode, games.img, games.subgenre, genres.genre FROM games INNER JOIN subgenres on subgenres.subgenre = games.subgenre INNER JOIN genres on genres.genre = subgenres.genre`);
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
      //console.log(resulting);
      setResults(resulting)
    } catch {
      console.log(error);
    }
  }

  //recommends second row of games? should we even have a second row?
  //using these matches generate recommendations based on ratings
  //and users shouldn't be recommended games they selected
  async function selectGenres(selections) {
    const returnLimit = 10;
    var genres = [];
    var query = `SELECT title, rating, mode, games.img, games.subgenre, genres.genre FROM games INNER JOIN subgenres on subgenres.subgenre = games.subgenre INNER JOIN genres on genres.genre = subgenres.genre WHERE`;

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

    selections.images.forEach(function(item){
      genres.push(item.value.genre);
    });

    //generating a list based on selected genres. how to weight how many times a genre was selected?
    const unique_genres = [...new Set(genres)];
    
    unique_genres.forEach(element => {
      query = query.concat(` genres.genre = '`+element+`'`)
      if(element != (unique_genres.slice(-1)[0])){
        query = query.concat(` OR`)
      } else {
        query = query.concat(` ORDER BY rating DESC LIMIT `+returnLimit+`;`);
      }
    });

    return await worker.db.query(query);
  }

  return (
              //maybe just use the first 5 or 6 values from data for the initial imagecontainer
      <div className="app">
            <Title />
            {data.length ? <ImageContainer data={data} getSelections={getSelections}/> : null}
            {results.length ? <ImageContainer data={results} getSelections={null}/>: null}
      </div>
  );
}

export default App;