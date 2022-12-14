const csv = require('csv-parser')
const { convertArrayToCSV } = require('convert-array-to-csv')
const fs = require('fs');
const { default: nodeTest } = require('node:test');
const ObjectsToCsv = require('objects-to-csv');
const Fuse = require('fuse.js')
const specialMapping = {}

specialMapping["COVERAGE"]= "CoverageCode";
specialMapping["STATUS"]= "CurrentLostStatus";
specialMapping[""]= "Litigation";
specialMapping["OSHASEV"]= "OSHASeverity";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";
specialMapping[""]= "";



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
    });
};

    /*
    dropDowns contains a list of objects, which contain a name and an array.
    ex:
    {
        name: 'Carrier', // field name to be replaced.
        values: [] // list of values you can pull from.

    }
    */

const handleMapping = async (claimsPath, valuesPath) => {//path variables are set at the end of the code (both csv files)
    const claims = await loadCSV(claimsPath);
    const dropDown = await loadCSV(valuesPath);

    const mappings = [];

    const addMapping = (field, value) => {
        //let mapping = mappings.find(x => x.name.toLowerCase() == field.toLowerCase());
        //let mapping = mappings.fuse.search(x => x.name.toLowerCase() === field.toLowerCase());

        let mapping = mappings.find(x => x.name.match() === field.match());

        if (mapping !== undefined) {
            if (mapping?.values === undefined) {
                mapping.values = [];
            };
            mapping.values.push(value);
        } else {
            mappings.push({
                name: field
            })
            addMapping(field,value);
        };
    };

    const getMapping = (field, key) => {
        let mapping = mappings.find(x => x.name.toLowerCase() == field.toLowerCase());
        if (mapping !== undefined) {
            let potentialValue = mapping.values.find(x => x.Key === key);
            if (potentialValue !== undefined) {
                return potentialValue.Value;
            };
        };

        return undefined;
    }

    for (let dd of dropDown) {
        addMapping(dd.FIELD_NAM, {
            Key: dd.CODE_ID,
            Value: dd.CODE_DESC
        });
    };

    // for (let dd of dropDown){
    //     addMapping(dd.)
    // }

    let mapping = getMapping('SpecialAnalysis#106', '487550');
    console.log(mapping);

    for (let claim of claims) {
        for (let field of Object.keys(claim)) {
            // console.log(field);
            // console.log(`Field: ${field}, Value: ${claim[field]}`)
            let mapping = getMapping(field, claim[field]);
            if (mapping != undefined) {
                claim[field] = mapping;
            }
        }
    }

    let csvData = new ObjectsToCsv(claims);
    await csvData.toDisk('./test.csv');
    // for (let claim of claims) {
    //     for (let field of Object.keys(claim)) {
    //         // console.log(field);
    //         let mapping = getMapping(field, claim[field]);
    //     }
    // }

}

handleMapping('./claimSample.csv', './claimDropDown.csv')

// async function main() {

//     const dropDowns = [];

//     for (let dd of dropDown) {
//         myMap[dd.CODE_ID] = dd.CODE_DESC;//initializes map
//     }

//     for(let cc of claims ) {
//         cc.FIELD_NAM =  myMap[cc.FIELD_NAM];//replaces fields 
//         console.log()

//        //new ObjectsToCsv(claims).toDisk('./test.csv');
//     }

//     const csv = new ObjectsToCsv(claims);
//     await csv.toDisk('./test.csv');

//     console.table(myMap);


    
// }

// main();



// for (let dropdown of dropDown) {
//     myMap[dropdown.CODE_ID] = dropdown.CODE_DESC;//mymap is an empty object that takes an object and maps fields based on what paremeters
// }


// // for (let input of sample ) {
// //     input.Carrier = myMap[input.Carrier]
// //   }
  
// console.table(myMap);

