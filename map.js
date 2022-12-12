const csv = require('csv-parser')
const fs = require('fs')
const myMap = {};
const claims = [];
const dropDown = [];



const sample = fs.createReadStream('./claimSample.csv')
  .pipe(csv())
  .on('data', (data) => claims.push(data))
  .on('end', () => {
    console.table(claims);
    
  });

  const claimDropDown= fs.createReadStream('./claimDropDown.csv')
  .pipe(csv())
  .on('data', (data) => dropDown.push(data))
  .on('end', () => {
    console.table(dropDown);
    
  });

for (let dropdown of dropDown) {
    myMap[dropdown.CODE_ID] = dropdown.CODE_DESC;//mymap is an empty object that takes an object and maps fields based on what paremeters
}

//console.table(myMap);

