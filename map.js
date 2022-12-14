const csv = require('csv-parser')
const { convertArrayToCSV } = require('convert-array-to-csv')
const fs = require('fs');
const { default: nodeTest } = require('node:test');
const ObjectsToCsv = require('objects-to-csv');
const Fuse = require('fuse.js')
const specialMapping = {}

specialMapping["COVERAGE"]= "CoverageCode";
specialMapping["STATUS"]= "CurrentLostStatus";
specialMapping["LIT"]= "Litigation";
specialMapping["OSHASEV"]= "OSHASeverity";
specialMapping["SPECIAL1"]= "SpecialAnalysis#1";
specialMapping["SPECIAL2"]= "SpecialAnalysis#2";
specialMapping["SPECIAL3"]= "SpecialAnalysis#3";
specialMapping["SPECIAL4"]= "SpecialAnalysis#4";
specialMapping["SPECIAL5"]= "SpecialAnalysis#5";
specialMapping["SPECIAL6"]= "SpecialAnalysis#6";
specialMapping["SPECIAL7"]= "SpecialAnalysis#7";
specialMapping["SPECIAL8"]= "SpecialAnalysis#8";
specialMapping["SPECIAL9"]= "SpecialAnalysis#9";
specialMapping["SPECIAL10"]= "SpecialAnalysis#10";
specialMapping["SPECIAL11"]= "SpecialAnalysis#11";
specialMapping["SPECIAL12"]= "SpecialAnalysis#12";
specialMapping["SPECIAL13"]= "SpecialAnalysis#13";
specialMapping["SPECIAL14"]= "SpecialAnalysis#14";
specialMapping["SPECIAL15"]= "SpecialAnalysis#15";
specialMapping["SPECIAL16"]= "SpecialAnalysis#16";
specialMapping["SPECIAL17"]= "SpecialAnalysis#17";
specialMapping["SPECIAL18"]= "SpecialAnalysis#18";
specialMapping["SPECIAL19"]= "SpecialAnalysis#19";
specialMapping["SPECIAL20"]= "SpecialAnalysis#20";
specialMapping["SPECIAL21"]= "SpecialAnalysis#21";
specialMapping["SPECIAL22"]= "SpecialAnalysis#22";
specialMapping["SPECIAL23"]= "SpecialAnalysis#23";
specialMapping["SPECIAL24"]= "SpecialAnalysis#24";
specialMapping["SPECIAL25"]= "SpecialAnalysis#25";
specialMapping["SPECIAL26"]= "SpecialAnalysis#26";
specialMapping["SPECIAL27"]= "SpecialAnalysis#27";
specialMapping["SPECIAL28"]= "SpecialAnalysis#28";
specialMapping["SPECIAL29"]= "SpecialAnalysis#29";
specialMapping["SPECIAL30"]= "SpecialAnalysis#30";
specialMapping["SPECIAL31"]= "SpecialAnalysis#31";
specialMapping["SPECIAL32"]= "SpecialAnalysis#32";
specialMapping["SPECIAL33"]= "SpecialAnalysis#33";
specialMapping["SPECIAL34"]= "SpecialAnalysis#34";
specialMapping["SPECIAL35"]= "SpecialAnalysis#35";
specialMapping["SPECIAL36"]= "SpecialAnalysis#36";
specialMapping["SPECIAL37"]= "SpecialAnalysis#37";
specialMapping["SPECIAL38"]= "SpecialAnalysis#38";
specialMapping["SPECIAL39"]= "SpecialAnalysis#39";
specialMapping["SPECIAL40"]= "SpecialAnalysis#40";
specialMapping["SPECIAL41"]= "SpecialAnalysis#41";
specialMapping["SPECIAL42"]= "SpecialAnalysis#42";
specialMapping["SPECIAL43"]= "SpecialAnalysis#43";
specialMapping["SPECIAL44"]= "SpecialAnalysis#44";
specialMapping["SPECIAL45"]= "SpecialAnalysis#45";
specialMapping["SPECIAL46"]= "SpecialAnalysis#46";
specialMapping["SPECIAL47"]= "SpecialAnalysis#47";
specialMapping["SPECIAL48"]= "SpecialAnalysis#48";
specialMapping["SPECIAL49"]= "SpecialAnalysis#49";
specialMapping["SPECIAL50"]= "SpecialAnalysis#50";
specialMapping["SPECIAL51"]= "SpecialAnalysis#51";
specialMapping["SPECIAL52"]= "SpecialAnalysis#52";
specialMapping["SPECIAL53"]= "SpecialAnalysis#53";
specialMapping["SPECIAL54"]= "SpecialAnalysis#54";
specialMapping["SPECIAL55"]= "SpecialAnalysis#55";
specialMapping["SPECIAL56"]= "SpecialAnalysis#56";
specialMapping["SPECIAL57"]= "SpecialAnalysis#57";
specialMapping["SPECIAL58"]= "SpecialAnalysis#58";
specialMapping["SPECIAL59"]= "SpecialAnalysis#59";
specialMapping["SPECIAL60"]= "SpecialAnalysis#60";
specialMapping["SPECIAL61"]= "SpecialAnalysis#61";
specialMapping["SPECIAL62"]= "SpecialAnalysis#62";
specialMapping["SPECIAL63"]= "SpecialAnalysis#63";
specialMapping["SPECIAL64"]= "SpecialAnalysis#64";
specialMapping["SPECIAL65"]= "SpecialAnalysis#65";
specialMapping["SPECIAL66"]= "SpecialAnalysis#66";
specialMapping["SPECIAL67"]= "SpecialAnalysis#67";
specialMapping["SPECIAL68"]= "SpecialAnalysis#68";
specialMapping["SPECIAL69"]= "SpecialAnalysis#69";
specialMapping["SPECIAL70"]= "SpecialAnalysis#70";
specialMapping["SPECIAL71"]= "SpecialAnalysis#71";
specialMapping["SPECIAL72"]= "SpecialAnalysis#72";
specialMapping["SPECIAL73"]= "SpecialAnalysis#73";
specialMapping["SPECIAL74"]= "SpecialAnalysis#74";
specialMapping["SPECIAL75"]= "SpecialAnalysis#75";
specialMapping["SPECIAL76"]= "SpecialAnalysis#76";
specialMapping["SPECIAL77"]= "SpecialAnalysis#77";
specialMapping["SPECIAL78"]= "SpecialAnalysis#78";
specialMapping["SPECIAL79"]= "SpecialAnalysis#79";
specialMapping["SPECIAL80"]= "SpecialAnalysis#80";
specialMapping["SPECIAL81"]= "SpecialAnalysis#81";
specialMapping["SPECIAL82"]= "SpecialAnalysis#82";
specialMapping["SPECIAL83"]= "SpecialAnalysis#83";
specialMapping["SPECIAL84"]= "SpecialAnalysis#84";
specialMapping["SPECIAL85"]= "SpecialAnalysis#85";
specialMapping["SPECIAL86"]= "SpecialAnalysis#86";
specialMapping["SPECIAL87"]= "SpecialAnalysis#87";
specialMapping["SPECIAL88"]= "SpecialAnalysis#88";
specialMapping["SPECIAL89"]= "SpecialAnalysis#89";
specialMapping["SPECIAL90"]= "SpecialAnalysis#90";
specialMapping["SPECIAL91"]= "SpecialAnalysis#91";
specialMapping["SPECIAL92"]= "SpecialAnalysis#92";
specialMapping["SPECIAL93"]= "SpecialAnalysis#93";
specialMapping["SPECIAL94"]= "SpecialAnalysis#94";
specialMapping["SPECIAL95"]= "SpecialAnalysis#95";
specialMapping["SPECIAL96"]= "SpecialAnalysis#96";
specialMapping["SPECIAL97"]= "SpecialAnalysis#97";
specialMapping["SPECIAL98"]= "SpecialAnalysis#98";
specialMapping["SPECIAL99"]= "SpecialAnalysis#99";
specialMapping["SPECIAL100"]= "SpecialAnalysis#100";
specialMapping["SPECIAL101"]= "SpecialAnalysis#101";
specialMapping["SPECIAL102"]= "SpecialAnalysis#102";
specialMapping["SPECIAL103"]= "SpecialAnalysis#103";
specialMapping["SPECIAL104"]= "SpecialAnalysis#104";
specialMapping["SPECIAL105"]= "SpecialAnalysis#105";
specialMapping["SPECIAL106"]= "SpecialAnalysis#106";
specialMapping["VOID_REASON"]= "VoidReason";




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


const handleMapping = async (claimsPath, valuesPath) => {
    const claims = await loadCSV(claimsPath);
    const dropDown = await loadCSV(valuesPath);

    const mappings = [];

    const addMapping = (field, value) => {
        let mapping = mappings.find(x => x.name.toLowerCase() == field.toLowerCase());
       

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
        let mappedName = field;
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

   

    for (let claim of claims) {
        for (let field of Object.keys(claim)) {

            console.log(field);
            let fieldname = field;
            if (specialMapping[field] != undefined) {
                fieldname = specialMapping[field];
            }
            let mapping = getMapping(fieldname, claim[field]);
            if (mapping != undefined) {
                claim[field] = mapping;
            }
        }
    }

    let csvData = new ObjectsToCsv(claims);
    await csvData.toDisk('./test.csv');


}

handleMapping('./claimSample.csv', './claimDropDown.csv')



