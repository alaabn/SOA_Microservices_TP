
const fs = require('fs');
const path = require('path');
const { Pool, types } = require('pg');
const getlatestFile = require('../utils/getLatestFile');

const sql = fs.readFileSync(path.join(path.resolve(), `./migrations/${getlatestFile('migrations')}`)).toString();
// const tables = sql.match(/^--[A-Za-z]+\n/gm)?.map(x => x.replaceAll("-", "").replaceAll("\n", ""));

types.setTypeParser(types.builtins.INT8, (value) => parseInt(value));
types.setTypeParser(20, BigInt);
types.setTypeParser(types.builtins.FLOAT8, (value) => parseFloat(value));
types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));
types.setTypeParser(types.builtins.DATE, (value) => new Date(value).toISOString());

let pool;

try {
    (async () => {
        pool = new Pool({
            connectionString: process.env.DB_URL
        });

        const res =
            await pool.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = 'expressApi';
                                    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        if (res.rowCount === 0) {
            console.log(`expressApi database not found, creating it.`);
            await pool.query(`CREATE DATABASE "expressApi";`);
            console.log(`created database expressApi`);
        } else {
            console.log(`expressApi database exists.`);
        }
        pool.query(sql);
    })();

} catch (error) {
    console.error(error)
}
const query = (text) => pool.query(text);

module.exports = query;


