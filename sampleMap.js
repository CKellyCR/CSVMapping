const myMap = {};

const claimDropdown = [
    {
        CODE_ID: 'ACE',
        CODE_DESC: 'ACE INA PRIM'
    },
    {
        CODE_ID: 'AFM',
        CODE_DESC: 'AFFILIATED FM INSURANCE'
    }
]

for (let dropdown of claimDropdown) {
    myMap[dropdown.CODE_ID] = dropdown.CODE_DESC;
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