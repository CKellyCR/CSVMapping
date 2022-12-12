const csv = require('csv-parser')
const fs = require('fs');
const { default: nodeTest } = require('node:test');
const ObjectsToCsv = require('objects-to-csv');


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

// const loadClaims = (path) =>{
//     const res = [];
//     return new Promise((resolve, reject)=>{
//         fs.createReadStream(path)
//         .pipe(csv())

//     })

// }

async function main() {
    const claims = await loadCSV('./claimSample.csv');
    const dropDown = await loadCSV('./claimDropDown.csv');

    for (let dd of dropDown) {
        myMap[dd.CODE_ID] = dd.CODE_DESC;//initializes map
    }

    for(let cc of claims ) {
        cc.FIELD_NAME = myMap[cc.FIELD_NAME]//replaces fields 
       const claim = claims.toString() 
       new ObjectsToCsv(claim).toDisk('./test.csv');
    }

    //console.table(myMap)
  
//await new ObjectsToCsv(claims).toDisk('./test.csv');
//  await new ObjectsToCsv(claims).toString('./test.csv');

//  (async () => {
//     const csv = new ObjectsToCsv(claims)
//     csv.toString().toDisk();
    
     
    
   
   
//   })();



    
}

main();



// for (let dropdown of dropDown) {
//     myMap[dropdown.CODE_ID] = dropdown.CODE_DESC;//mymap is an empty object that takes an object and maps fields based on what paremeters
// }


// // for (let input of sample ) {
// //     input.Carrier = myMap[input.Carrier]
// //   }
  
// console.table(myMap);

