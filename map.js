const csv = require('csv-parser')
const fs = require('fs');
const myMap = {};


const loadCSV = (path) => {
    const res = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => res.push(data))
        .on('end', () => {
            resolve(res);
        })
        .on('error', (err) => {
            reject(err)
        });
    })
}

async function main() {
    const claims = await loadCSV('./claimSample.csv');
    const dropDown = await loadCSV('./claimDropDown.csv');

    for (let dd of dropDown) {
        myMap[dd.CODE_ID] = dd.CODE_DESC;
    }

    console.log(myMap)
}

main();

// for (let dropdown of dropDown) {
//     myMap[dropdown.CODE_ID] = dropdown.CODE_DESC;//mymap is an empty object that takes an object and maps fields based on what paremeters
// }


// // for (let input of sample ) {
// //     input.Carrier = myMap[input.Carrier]
// //   }
  
// console.table(myMap);

