PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- DROP TABLES
DROP TABLE IF EXISTS character;
DROP TABLE IF EXISTS conversation;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS line;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS movie_genre;


CREATE TABLE character (
    id         TEXT PRIMARY KEY,
    name       TEXT,
    movie_id   TEXT REFERENCES movie (id) ON DELETE CASCADE,
    gender     TEXT,
    credit_pos TEXT
);
CREATE TABLE conversation (
    id INTEGER PRIMARY KEY,
    first_char_id   TEXT    REFERENCES character (id) ON DELETE CASCADE,
    second_char_id  TEXT    REFERENCES character (id) ON DELETE CASCADE,
    movie_id        TEXT    REFERENCES movie (id) ON DELETE CASCADE
);
CREATE TABLE genre (
    id   INTEGER PRIMARY KEY,
    name TEXT
);
CREATE TABLE line (
    id              TEXT    PRIMARY KEY,
    character_id    TEXT    REFERENCES character (id) ON DELETE CASCADE,
    movie_id        TEXT    REFERENCES movie (id) ON DELETE CASCADE,
    line_text       TEXT,
    conversation_id INTEGER REFERENCES conversation (first_char_id) ON DELETE CASCADE
);
CREATE TABLE movie (
    id          TEXT    PRIMARY KEY,
    title       TEXT,
    year        TEXT,
    imdb_rating REAL,
    imdb_votes  INTEGER
);
CREATE TABLE movie_genre (
    movie_id TEXT    REFERENCES movie (id),
    genre_id INTEGER REFERENCES genre (id),
    CONSTRAINT movie_genre_pk PRIMARY KEY (movie_id, genre_id) ON CONFLICT REPLACE ON DELETE CASCADE
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;