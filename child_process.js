const child_process = require('child_process');

const a = process.argv[2];
const b = process.argv[3];

const line = `node index.js ${a} ${b} `

        child_process.exec(line, (err, result)=> {
        if(err) {
            reject('Ha ocurrido un error');
        }

        });