
import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
          "sql.js-httpvfs/dist/sqlite.worker.js",
          import.meta.url
        );
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
const workerSettings =  
    [
              {
              from: "inline",
              config: {
                  serverMode: "full",
                  url: "./db/games.db",
                  requestChunkSize: 4096,
              },
              },
    ];
  
//loads game data for initial selection
export async function load(){
      const worker = await createDbWorker(
        workerSettings,
        workerUrl.toString(),
        wasmUrl.toString()
      );
    
      return await worker.db.query(`SELECT title, rating, mode, games.img, games.subgenre, genres.genre FROM games INNER JOIN subgenres on subgenres.subgenre = games.subgenre INNER JOIN genres on genres.genre = subgenres.genre ORDER BY RANDOM() LIMIT 8`);
  }

//gets recommended games using subgenre to genre matching & review scores
export async function selectGenres(selections){
      const returnLimit = 10;
      var genres = [];
      var query = `SELECT title, rating, mode, games.img, games.subgenre, genres.genre FROM games INNER JOIN subgenres on subgenres.subgenre = games.subgenre INNER JOIN genres on genres.genre = subgenres.genre WHERE`;

      const worker = await createDbWorker(
          workerSettings,
          workerUrl.toString(),
          wasmUrl.toString()
      );

      selections.images.forEach(function(item){
        genres.push(item.value.genre);
      });

      //removes duplicate genres - could be improved by adding additional weighting to genres selected mutiple times
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



