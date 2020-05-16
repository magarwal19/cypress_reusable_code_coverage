// import { readFileSync, writeFileSync } from "fs";
// import { parse } from "papaparse";

const GSheetReader = require('g-sheets-api');
//import 'g-sheets-api'
//const GSheetReader = require('g-sheet-api');
//this file contains the functions which can be reused across the project.
class Reusable {

  processExcel() {

    let filepath = "D:\\Automation frameworks\\react-redux\\react-redux-realworld-example-app_without BDD\\cypress\\fixtures\\UserCreation.xlsx";
    //Read the Excel File data.
   debugger;
    const XLSX = require('xlsx');
   const workbook = XLSX.readFile(filepath);

    //Fetch the name of First Sheet.
    const firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{defval:""});
    return excelRows;
};
  //function returns a random number between two numbers
  getRandomNumber(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
  }

  readGsheet() {
    const options = {
      sheetId: '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg',
      sheetNumber: 1,
      returnAllResults: false,
      filter: {
        'department': 'archaeology',
        'module description': 'introduction'
      },
      filterOptions: {
        operator: 'or',
        matching: 'loose'
      }
    }
    let var1='tes111'
    GSheetReader(options, results => {
      results.forEach((result) => {
        if(result)
        {
          cy.log(`valuesss in the result areeeeeeeeeeee`)
        }
        Object.keys(result).forEach((key) => {
          var1 = result[key];
        });
      });
      /* Do something amazing with the results */
    });
    cy.log(`value stored is ${var1}`)
  }
  readCSV() {
    try {
      const csvFile = readFileSync("../fixtures/test.csv", "utf8");
      const csvResults = parse(csvFile, {
        header: true,
        complete: (csvData) => csvData.data,
      }).data;
      writeFileSync(
        "../fixtures/testDataFromCSV.json",
        JSON.stringify(csvResults, null, 4),
        "utf-8"
      );
    } catch (e) {
      throw Error(e);
    }
  }
  //gives the current system time date in different date formats.
  //date can be mm-dd-yyyy or yyyy-mm-dd with any separator
  getCurrentDate(dateTime, format, isUtc) {
    let fullDate = new Date();
    if (dateTime) {
      fullDate = new Date(dateTime);
      cy.log(`date in the format is ${fullDate}`);
    }
    let separator = "-";
    //get the date separator
    if (format) {
      if (format.includes("/")) {
        separator = "/";
      } else if (format.includes("-")) {
        separator = "-";
      } else if (format.includes(".")) {
        separator = ".";
      }
    }
    let year, month, date, hours, minutes, seconds, timeZone, timeZoneSymbol;
    //get details from date which are used to generate date as per format
    if (isUtc) {
      year = fullDate.getUTCFullYear();
      month = parseInt(fullDate.getUTCMonth()) + 1;
      date = fullDate.getUTCDate();
      hours = fullDate.getUTCHours();
      minutes = fullDate.getUTCMinutes();
      seconds = fullDate.getUTCSeconds();
      timeZone = "+00:00";
    } else {
      year = fullDate.getFullYear();
      month = parseInt(fullDate.getMonth()) + 1;
      date = fullDate.getDate();
      hours = fullDate.getHours();
      minutes = fullDate.getMinutes();
      seconds = fullDate.getSeconds();
      timeZone = fullDate.getTimezoneOffset();

      //convert timezoneoffset to hours and minutes
      if (timeZone > 0) {
        timeZoneSymbol = "+";
      } else {
        timeZoneSymbol = "-";
        timeZone = timeZone * -1;
      }
      var hrs = timeZone / 60;
      var rhours = Math.floor(hrs);
      var min = (hrs - rhours) * 60;
      var rminutes = Math.round(min);
      //append 0 if single digit
      if (parseInt(rhours) < 10) {
        rhours = "0" + rhours;
      }
      if (parseInt(rminutes) < 10) {
        rminutes = "0" + rminutes;
      }
      timeZone = `${timeZoneSymbol}${rhours}:${rminutes}`;
    }
    //append 0 if single digit
    if (parseInt(date) < 10) {
      date = "0" + date;
    }
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    if (parseInt(hours) < 10) {
      hours = "0" + hours;
    }
    if (parseInt(minutes) < 10) {
      minutes = "0" + minutes;
    }
    if (parseInt(seconds) < 10) {
      seconds = "0" + seconds;
    }
    //default date
    fullDate = `${date}${separator}${month}${separator}${year}T${hours}:${minutes}:${seconds}${timeZone}`;
    //if format provided
    if (format) {
      if (format == `MM${separator}DD${separator}YYYY`) {
        fullDate = `${month}${separator}${date}${separator}${year}`;
      } else if (format == `YYYY${separator}MM${separator}DD`) {
        fullDate = `${year}${separator}${month}${separator}${date}`;
      }
      if (format == `DD${separator}MM${separator}YYYY`) {
        fullDate = `${date}${separator}${month}${separator}${year}`;
      }
      if (format.includes("hh")) {
        fullDate = `${fullDate}T${hours}:${minutes}:${seconds}`;
        if (format.includes("TZD")) {
          fullDate = `${fullDate}${timeZone}`;
        }
      }
    }
    return fullDate;
  }
}
export default Reusable;
