const path = require('path');

const rootPath = __dirname;

let dbURL = 'mongodb://localhost/dispatchers';
let port = 8000;

if(process.env.NODE_ENV === 'test') {
    dbURL = 'mongodb://localhost/dispatchers-test';
}


module.exports = {
    rootPath,
    port,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbURL,
        options: {useNewUrlParser: true},
    },
};