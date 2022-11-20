const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const users = require('./app/users');
const carriers = require('./app/carriers');
const drivers = require('./app/drivers');
const loads = require('./app/loads');
const learnings = require('./app/learnings');
const config = require('./config');
const bot = require("./telegramBotSD");

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/carriers', carriers);
app.use('/drivers', drivers);
app.use('/loads', loads);
app.use('/learnings', learnings);


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

bot();

run().catch(e => console.log(e));