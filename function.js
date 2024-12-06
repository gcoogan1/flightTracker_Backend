// const fs = require('fs'); // Import the file system module
const airlines = require('./airlines.json');

// const newJson = (originalObject) => {
//   let newArray = []; // Use an array to store the reformatted entries

//   Object.entries(originalObject).forEach(([key, value]) => {
//     const newFormat = {
//       code: key,
//       airline_name: value,
//     };

//     newArray.push(newFormat); // Add the reformatted entry to the array
//   });

//   console.log("NEW:", newArray); // Logs the transformed array

//   // Write the result to a new JSON file
//   fs.writeFileSync('new_airlines.json', JSON.stringify(newArray, null, 2), 'utf8');
//   console.log("File 'new_airlines.json' has been created!");

//   return newArray;
// };

// newJson(airlines);
