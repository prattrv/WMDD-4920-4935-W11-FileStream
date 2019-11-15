const fs = require('fs')

// let content = '<h1>Hello <b>FFS</b>!</h1>'

// let something = require('./somefile.js')
// ./ refers to the folder from which the script is being run EXCEPT when used with require (in which case it refers to the folder where the script belongs)

// fs.writeFile('newFile.html', content, error => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('newFile.html has been successfully created.')
        
//         let final = ''
        
//         fs.createReadStream('.newFile.html')
//         .on('data', row => {
//             final += row
//         })
//         .on('end', () => {
//             console.log('all done!')
//             console.log(final)
//         })
//         .on('error', error => {
//             console.log(error)
//         })
//     }
// })

const csvParser = require('csv-parser')
const stripBomStream = require('strip-bom-stream')
// CSV Files have a byte order marker at the start of the file that we need to get rid of in order to parse it properly.

fs.createReadStream('./bands.csv')
    .pipe(stripBomStream()) // takes the output of one stream and passes it into another.// In this case we're using it to pass the data from the read stream of bands.csv into the functions that strip the bom and convert the data from csv to a JS object
    .pipe(csvParser())
    .on('data', row => {
        console.log(row)
    })
    .on('end', () => {
        console.log('success')
    })