const TelegramApi = require('node-telegram-bot-api');
const Load = require("./models/Load");
const Driver = require("./models/Driver");
const User = require("./models/User");

const token = "936426396:AAEwbo64h7Nf3lEJ56bW1ZoA3plMlyPl9VQ";

const bot = new TelegramApi(token, {polling: true});

module.exports = driversBot = () => {
    bot.on('message', async msg => {
        const text = msg.text.toLowerCase();
        const chatId = msg.chat.id;

        if (text === '/start') {
            const htmlStart = `<b>Supreme Dispatch welcomes you</b> ${msg.from.first_name}
<b>For continuation, enter your email</b>
Example => <b>dispatch@gmail.com</b>`
            return await bot.sendMessage(chatId, htmlStart, {
                parse_mode: 'HTML'
            });
        }

        if (text.match(/(@)/g)) {
            try {
                const driver = await Driver.findOne({email: text});
                const user = await User.findOne({email: text});

                if (driver) {
                    await Driver.findByIdAndUpdate({_id: driver.id}, {telegramId: msg.from.id});
                    return await bot.sendMessage(chatId, 'Your telegram connect to your loads with bot\nNow u can see which load u have by using command /load');
                }

                if (user) {
                    await User.findByIdAndUpdate({_id: user.id}, {telegramId: msg.from.id});
                    return await bot.sendMessage(chatId, 'Your telegram connect with bot');
                } else {
                    return await bot.sendMessage(chatId, 'You are not registered');
                }

            } catch (e) {
                console.log(e);
            }
        }

        const keyboardTripAccept = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: 'Accept',
                        callback_data: 'accept'
                    },
                        {
                            text: 'Cancel',
                            callback_data: 'cancel'
                        }]
                ],
            })
        };

        const keyboardTripTransit = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: 'In Transit',
                        callback_data: 'transit'
                    }]
                ],
            })
        };

        if (text === '/load') {
            const driver = await Driver.findOne({telegramId: msg.from.id});

            if (!driver) {
                return await bot.sendMessage(chatId, 'You are not registered');
            }
            const load = await Load.find({driverId: driver.id});
            const upcomingLoad = load[0];

            if (upcomingLoad && upcomingLoad.status === 'upcoming') {
                const htmlLoad =
                    `<b>Load\'s Code</b>: ${upcomingLoad.loadCode}
<b>Price</b>: ${upcomingLoad.price}
<b>Miles</b>: ${upcomingLoad.miles}
<b>Date Pick Up</b>: ${upcomingLoad.datePU}
<b>Date Delivery</b>: ${upcomingLoad.dateDEL}
<b>Location Pick Up from</b>: ${upcomingLoad.pu} => <b>Location Delivery to</b>: ${upcomingLoad.del}`

                await bot.sendMessage(driver.telegramId, htmlLoad, {
                    parse_mode: 'HTML',
                });

                await bot.sendMessage(driver.telegramId, 'You can accept and cancel a load ', keyboardTripAccept);
            }
        }

        if (text.match(/(\d)/g)) {
            const driver = await Driver.findOne({telegramId: msg.from.id});
            if (driver) {
                const load = await Load.find({driverId: driver.id});
                await Load.findByIdAndUpdate({_id: load[0].id}, {timeToPU: text});
                await bot.sendMessage(driver.telegramId, 'Put the button when u will ready for delivery a load', keyboardTripTransit);
            }
        }
    });

    bot.on('callback_query', async (msg) => {
        const keyboardTripDelivered = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: 'Finish',
                        callback_data: 'finish'
                    }]
                ],
            })
        };

        const driver = await Driver.findOne({telegramId: msg.from.id});
        const load = await Load.findOne({driverId: driver.id});
        const dispatcherId = await User.findById({_id: load.dispatchId});

        if (msg.data === 'accept') {
            await bot.sendMessage(driver.telegramId, 'Can you write how much time u need to PU trip');
        }

        if (msg.data === 'cancel') {
            if (dispatcherId && dispatcherId.telegramId) {
                await bot.sendMessage(dispatcherId.telegramId, `Driver refused load - ${load.loadCode}`);
            }
        }

        if (msg.data === 'transit') {

            if (load.status === 'upcoming') {
                await Load.findByIdAndUpdate({_id: load.id}, {status: 'transit'});
                await bot.sendMessage(driver.telegramId, `Пожалуйста нажмите на кнопку FINISH тока, когда как вы доставите груз - ${load.loadCode}`, keyboardTripDelivered);
            } else {
                console.log('Вы уже везете груз');
            }
        }

        if (msg.data === 'finish') {
            if (dispatcherId && dispatcherId.telegramId) {
                await bot.sendMessage(dispatcherId.telegramId, `Водитель - ${driver.name}, доставил груз - ${load.loadCode}`);
            }
        }
    });
};