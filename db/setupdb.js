const {cp} = require('./connection.js')

const fs = require('fs')
const csvParser = require('csv-parser')
const stripBomStream = require('strip-bom-stream')
const mysql = require('mysql')

let setupBands = bandFileName => {
    return new Promise((resolve, reject) => {
        let bandSQL = 'DROP TABLE IF EXISTS band; CREATE TABLE band (id int AUTO_INCREMENT, name varchar(255), genre varchar(255), PRIMARY KEY(id));'
        
        fs.createReadStream(bandFileName)
            .pipe(stripBomStream())
            .pipe(csvParser())
            .on('data', row => {
                console.log(row)
                let bandName = mysql.escape(row.name)
                let bandGenre = mysql.escape(row.genre)
                
                let bandInsertSQL = `INSERT INTO band(name, genre)
                VALUES (
                    ${bandName},
                    ${bandGenre}
                );`
                
                bandSQL = bandSQL.concat(bandInsertSQL)
            })
            .on('end', () => {
                 cp.query(bandSQL, (error, results) => {
                    if (error) 
                        reject(error)
                    else
                        resolve(results)
                })         
            })
        
       
    })
}

setupBands('./bands.csv')
.then(result => {console.log('success'); process.exit()})
.catch(error => {console.log(error); process.exit()})