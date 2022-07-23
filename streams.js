const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' }); //encoding instead of console.log(chunk.toString());
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => { //method .on is event listener for data
//     console.log('---- new chunk ----');
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

//piping
readStream.pipe(writeStream);
