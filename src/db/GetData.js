
import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
    "sql.js-httpvfs/dist/sqlite.worker.js",
    import.meta.url
  );
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

export class GetData{
    async load() {
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

    retrieveData = async() => {
        try {
            var response = await load();
            setData(response);
        } catch(error){
            console.log(error);
        }
    };

    //given an array of genres that were selected by user, return
    //games based on genre matching & scoring.
    async selectGenres(genres) {
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

        return await worker.db.query(`SELECT * FROM games INNER JOIN subgenres on subgenres.name = games.subgenre WHERE subgenres.genre = `);
    }
}

