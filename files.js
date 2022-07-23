const fs = require('fs');

//reading files
// fs.readFile('./docs/blog.txt', (err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// writing files
// fs.writeFile('./docs/blog.txt', 'hello, world', () => {
//     console.log('file was written');
// });

// fs.writeFile('./docs/blog2.txt', 'hello, world', () => {
//     console.log('file was written');
// });

//directories
//create or delete folder based on if it is or it isn't created
if (!fs.existsSync('./assets')) { //create folder only if it doesnt exist - exclamation mark(!) 
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created');
    });
} else {
    fs.rmdir('./assets', (err) => {
        if(err) {
            console.log(err);
        } 
        console.log('folder deleted');
    })
}

//deleting files
if(fs.existsSync('./docs/deleteme.txt')) {
    /** unlink to delete */
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err) {
            console.log(err)
        }
        console.log('file deleted');
    })
}
