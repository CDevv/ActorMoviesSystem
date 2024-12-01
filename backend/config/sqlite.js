const dbFile = 'db.sqlite'

const sqlite3 = require('sqlite3').verbose()

let db

if (process.env.NODE_ENV === 'test') {
    db = new sqlite3.Database(':memory:')
} else {
    db = new sqlite3.Database(dbFile)
}

function defaultTables()
{
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS "actors" (
            "id"	INTEGER,
            "name"	TEXT,
            "birthDate"	INTEGER,
            PRIMARY KEY("id" AUTOINCREMENT)
        )`)
    
        db.run(`CREATE TABLE IF NOT EXISTS "movies" (
            "id"	INTEGER,
            "title"	TEXT,
            "releaseDate"	INTEGER,
            PRIMARY KEY("id" AUTOINCREMENT)
        )`)
    
        db.run(`CREATE TABLE IF NOT EXISTS "actorMovies" (
            "actorId"	INTEGER,
            "movieId"	INTEGER,
            "role"	TEXT,
            CONSTRAINT "actor_id_fk" FOREIGN KEY("actorId") REFERENCES "actors"("id"),
            CONSTRAINT "movie_id_fk" FOREIGN KEY("movieId") REFERENCES "movies"("id")
        )`)
    })
    
    db.close()
}

module.exports = {db, defaultTables}