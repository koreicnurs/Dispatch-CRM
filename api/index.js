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

const TelegramApi = require('node-telegram-bot-api');
const Load = require("./models/Load");
const Driver = require("./models/Driver");

const token = "5488385805:AAGNvotjoClkC-YtvW92CfmeWTjVlvByvdc";

const bot = new TelegramApi(token, {polling: true});

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg.from.id);
    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c5c/bbf/c5cbbf25-286a-4f43-a11a-ba16fcebd649/2.jpg')
        await bot.sendMessage(chatId, `Hello ${msg.chat.first_name}`)
    }

    if (text.match(/(@)/g)) {
        try {
            const driver = await Driver.findOne({email: text});
            if (driver) {
                const driver1 = await Driver.findByIdAndUpdate({_id: driver.id}, {telegramId: msg.from.id});
                const load = await Load.find({driverId: driver.id});
                const upcomingLoad = load[0];
                if (upcomingLoad.status === 'upcoming') {
                    const htmlLoad =
                        `<b>Load\'s Code</b>: ${upcomingLoad.loadCode}
<b>Price</b>: ${upcomingLoad.price}
<b>Miles</b>: ${upcomingLoad.miles}
<b>Date Pick Up</b>: ${upcomingLoad.datePU}
<b>Date Delivery</b>: ${upcomingLoad.dateDEL}
<b>Location Pick Up from</b>: ${upcomingLoad.pu} => <b>Location Delivery to</b>: ${upcomingLoad.del}`
                    return await bot.sendMessage(driver1.telegramId, htmlLoad, {
                        parse_mode: 'HTML'
                    });
                } else {
                    return await bot.sendMessage(chatId, 'You don\'t have load');
                }
            } else {
                return await bot.sendMessage(chatId, 'You are not registered');
            }
        } catch (e) {
            console.log(e);
        }
    }
})

run().catch(e => console.log(e));