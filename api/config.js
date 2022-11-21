const path = require('path');

const rootPath = __dirname;

let dbURL = 'mongodb://localhost/dispatchers';
let port = 8000;

if(process.env.NODE_ENV === 'test') {
    dbURL = 'mongodb://localhost/dispatchers';
    port = 8010;
}


module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/dispatchers',
        options: {useNewUrlParser: true},
    },
};