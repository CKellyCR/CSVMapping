const csv = require('csv-parser')
const fs = require('fs')
const myMap = {};

// const claimDropdown = [//will load in with csv parser
//     {
//         CODE_ID: 'ACE',
//         CODE_DESC: 'ACE INA PRIM'
//     },
//     {
//         CODE_ID: 'AFM',
//         CODE_DESC: 'AFFILIATED FM INSURANCE'
//     }
// ]

fs.createReadStream('claimSample.csv')
  .pipe(csv())
  .on('claimSample', (claimSample) => results.push(claimSample))
  .on('end', () => {
    console.log(myMap);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });

  fs.createReadStream('claimDropDown')
  .pipe(csv())
  .on('claimDropDown', (claimDropDown) => results.push(claimDropDown))
  .on('end', () => {
    console.log(myMap);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });

for (let dropdown of claimDropdown) {
    myMap[dropdown.CODE_ID] = dropdown.CODE_DESC;//mymap is an empty object that takes an object and maps fields based on what paremeters
}

console.table(myMap);

const inputData = [//will load in with csv parser
  {
    Carrier: 'ACE',
    CLAIM_ID: 5
  },
  {
    Carrier: 'AFM',
    CLAIM_ID: 9
  }
]

console.table(inputData);

for (let input of inputData) {
  input.Carrier = myMap[input.Carrier]
}

console.table(inputData);