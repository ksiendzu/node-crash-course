/* import multiple things from different file */
const {people, ages} = require('./people');

 console.log(people, ages);

const os = require('os');

console.log(os.platform(), os.homedir());