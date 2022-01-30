const { parse }  = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

// to find habitable planets we make a function that renders T/F dependenting on criteria
function isHabitableplanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    // if confirmed then we check for the sunlight the planet gets 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    // and we check for the planets radius so its not like a gasoues planet
    && planet['koi_prad'] < 1.6;
}

// the fs.createREadStream('kepler_csv) is the source
fs.createReadStream('kepler_data.csv')
// meanwhile the pipe function converts the data to give it a destination
// data coming will be readable and the data going is writable
  .pipe(parse({
      comment: '#',
      columns: true,    // this will render an array in objects
  }))
  .on('data', (data) => {
   if (isHabitableplanet(data)) {
     habitablePlanets.push(data);
   }   
  })  //error handler to check if the csv name is correct
  .on('error', (err) => {
      console.log(err);
  })
  .on('end', () => {
      //We use the .map functiuon to iterate over the 8 habitable planets
      console.log(habitablePlanets.map((planet) => {
          return planet['kepler_name'];
      }))
      console.log(`${habitablePlanets.length} habitable planets found`)
  });
//parse();