const dbFile = 'db.sqlite'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbFile)

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS "actors" (
        "id"	INTEGER,
        "name"	TEXT,
        "birth_date"	INTEGER,
        PRIMARY KEY("id")
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS "movies" (
        "id"	INTEGER,
        "title"	TEXT,
        "release_date"	INTEGER,
        PRIMARY KEY("id")
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS "actor_movies" (
        "actor_id"	INTEGER,
        "movie_id"	INTEGER,
        "role"	TEXT,
        CONSTRAINT "actor_id_fk" FOREIGN KEY("actor_id") REFERENCES "actors"("id"),
        CONSTRAINT "movie_id_fk" FOREIGN KEY("movie_id") REFERENCES "movies"("id")
    )`)
})

db.close()

export {db}