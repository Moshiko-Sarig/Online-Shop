const db=require("mysql");


const pool=db.createPool({
    host: "localhost",
    user: "root",
    database: "super_db"
});

console.log("connected to db");


function executeQueryAsync(sqlCmd) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, (err, rows)=> {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);      
            }
        });
    });
}


module.exports = {
    executeQueryAsync
};
