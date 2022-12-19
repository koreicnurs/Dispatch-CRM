// const
//     TelegramTester = require('telegram-test'),
//     TelegramApi = require('node-telegram-bot-api'),
//     bot = new TelegramApi("936426396:AAEwbo64h7Nf3lEJ56bW1ZoA3plMlyPl9VQ", {polling: true});
//     b = require('../telegramBotSD.test');

// class TestBot {
//     constructor(bot) {
//         bot.onText(/\/ping/, (msg, match) => {
//             let chatId = msg.from.id;
//             let opts = {
//                 reply_to_message_id: msg.message_id,
//                 reply_markup: JSON.stringify({
//                     keyboard: [[{text: 'ok'}]],
//                 }),
//             };
//             bot.sendMessage(chatId, 'pong', opts);
//         });
//
//         bot.onText(/\/start/, (msg, match) => {
//             let chatId = msg.from.id;
//             let opts = {
//                 reply_to_message_id: msg.message_id,
//                 reply_markup: JSON.stringify({
//                     keyboard: [[{text: 'Masha'}, {text: 'Sasha'}]],
//                 }),
//             };
//             bot.sendMessage(chatId, 'What is your name?', opts);
//         });
//
//         bot.onText(/Masha/, (msg, match) => {
//             let chatId = msg.from.id;
//             let opts = {
//                 reply_to_message_id: msg.message_id,
//                 reply_markup: JSON.stringify({
//                     keyboard: [[{text: 'Hello!'}]],
//                 }),
//             };
//             bot.sendMessage(chatId, 'Hello, Masha!', opts);
//         });
//
//         bot.onText(/Sasha/, (msg, match) => {
//             let chatId = msg.from.id;
//             let opts = {
//                 reply_to_message_id: msg.message_id,
//                 reply_markup: JSON.stringify({
//                     keyboard: [[{text: 'Hello!'}]],
//                 }),
//             };
//             bot.sendMessage(chatId, 'Hello, Sasha!', opts);
//         });
//     }
// }


// describe('Telegram Test', () => {
//     const myBot = new TestBot(telegramBot);
//     let testChat = 1;
//     it('should be able to talk with sample bot', () => {
//         const telegramTest = new TelegramTester(telegramBot);
//         return telegramTest.sendUpdate(testChat, '/ping')
//             .then((data) => {
//                 if (data.text === 'pong') {
//                     return telegramTest.sendUpdate(testChat, '/start');
//                 }
//                 throw new Error(`Wrong answer for ping! (was  ${data.text})`);
//             })
//             .then(data => telegramTest.sendUpdate(testChat, data.keyboard[0][1].text))
//             .then((data) => {
//                 if (data.text === 'Hello, Sasha!') {
//                     return true;
//                 }
//                 throw new Error('Wrong greeting!');
//             });
//     });
// });

const TelegramApi = require('node-telegram-bot-api');
const Load = require("../models/Load");
const Driver = require("../models/Driver");
const User = require("../models/User");
const TelegramTester = require("telegram-test");

const token = "5488385805:AAGNvotjoClkC-YtvW92CfmeWTjVlvByvdc";

const bot = new TelegramApi(token, {polling: true});

const tripsStatus = {
    accept: "accept",
    cancel: "cancel",
    transit: "transit",
    finish: "finish",
    upcoming: "upcoming",
}

const driversStatus = {
    driving: "driving",
    rest: "rest",
    emergency: "emergency",
    off: "off",
}

module.exports = driversBot = () => {

    const keyboardDriverStatus = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: 'Driving',
                    callback_data: driversStatus.driving
                }],
                [{
                    text: 'Rest',
                    callback_data: driversStatus.rest
                }],
                [{
                    text: 'Emergency',
                    callback_data: driversStatus.emergency
                }],
                [{
                    text: 'Off',
                    callback_data: driversStatus.off
                }]
            ],
        })
    };

    const keyboardTripDelivered = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: 'Finish',
                    callback_data: tripsStatus.finish
                }]
            ],
        })
    };

    const keyboardTripAccept = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: 'Accept',
                    callback_data: tripsStatus.accept
                },
                    {
                        text: 'Cancel',
                        callback_data: tripsStatus.cancel
                    }]
            ],
        })
    };

    const keyboardTripTransit = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: 'In Transit',
                    callback_data: tripsStatus.transit
                }]
            ],
        })
    };

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            const htmlStart = `<b>Компания Supreme Dispatch приветсвует Вас!</b> ${msg.from.first_name}
<b>Для продолжения работы напишите свою рабочую почту</b>
Пример => <b>supremh@gmail.com</b>`
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
                    return await bot.sendMessage(chatId, 'Вы зарегистрированы в телеграм боте\nУ вас имеются команды: /load и /status\n/status - введите для изменения вашего статуса\n/load - введите для просмотра нового груза');
                }

                if (user) {
                    await User.findByIdAndUpdate({_id: user.id}, {telegramId: msg.from.id});
                    return await bot.sendMessage(chatId, 'Вы зарегистрированы в телеграм боте, в этот чат будут приходить оповещения');
                } else {
                    return await bot.sendMessage(chatId, 'Вас нету в базе данных\nУбедитесь в правильности ввода рабочей почты');
                }

            } catch (e) {
                console.log(e);
            }
        }

        if (text === '/load') {
            try {
                // const driver = await Driver.findOne({telegramId: msg.from.id});
                //
                // if (!driver) {
                //     return await bot.sendMessage(chatId, 'У вас нету заказов по грузам');
                // }
                // const load = await Load.find({driverId: driver.id});
                // const upcomingLoad = load[0];

                if (upcomingLoad && upcomingLoad.status === tripsStatus.upcoming) {
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

                    await bot.sendMessage(driver.telegramId, `Вы можете отклонить или принять заказ по грузу ${upcomingLoad.loadCode}\nЧтобы принять нажмите кнопку "Accept"\nЧтобы отклонить нажмите кнопку "Cancel"`, keyboardTripAccept);
                }
                return await bot.sendMessage(chatId, `${msg.from.id}`)
            } catch (e) {
                console.log(e);
            }
        }

        if (text.match(/(\d)/g)) {
            try {
                const driver = await Driver.findOne({telegramId: msg.from.id});
                if (driver) {
                    const load = await Load.find({driverId: driver.id});
                    await Load.findByIdAndUpdate({_id: load[0].id}, {timeToPU: text});
                    await bot.sendMessage(driver.telegramId, 'Пожалуйста нажмите на кнопку "In Transit" как начнете ехать до места доставки', keyboardTripTransit);
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (text === '/status') {
            try {
                const driver = await Driver.findOne({telegramId: msg.from.id});
                await bot.sendMessage(driver.telegramId, 'Пожалуйста выберете свой статус\nDriving - вы в пути\nRest - вы отдыхаете\nEmergency - технические или какие другие проблемы\nOff - вы берете выходной', keyboardDriverStatus);
            } catch (e) {
                console.log(e);
            }
        }
    });

    bot.on('callback_query', async (msg) => {
        try {
            const driver = await Driver.findOne({telegramId: msg.from.id});
            const load = await Load.findOne({driverId: driver.id});
            const dispatcherId = await User.findById({_id: load.dispatchId});

            if (msg.data === tripsStatus.accept) {
                await bot.sendMessage(driver.telegramId, 'Пожалуйста напишие время прибытия до груза и загрузки\nПример: 5ч 20мин');
            }

            if (msg.data === tripsStatus.cancel) {
                if (dispatcherId && dispatcherId.telegramId) {
                    await bot.sendMessage(dispatcherId.telegramId, `Водитель отклонил груз - ${load.loadCode}`);
                    await bot.sendMessage(driver.telegramId, `Вы отказались от груза - ${load.loadCode}\nОповещение диспетчеру было отправлено`);
                } else {
                    await bot.sendMessage(driver.telegramId, `Что то пошло не так =( обратитесь в компанию`);
                }
            }

            if (msg.data === tripsStatus.transit) {
                if (load.status === tripsStatus.upcoming) {
                    try {
                        await Load.findByIdAndUpdate({_id: load.id}, {status: 'transit'});
                        await bot.sendMessage(driver.telegramId, `Пожалуйста нажмите на кнопку FINISH тока, когда как вы доставите груз - ${load.loadCode}`, keyboardTripDelivered);
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    await bot.sendMessage(driver.telegramId, `Ваш статус груза ${tripsStatus.transit}`);
                }
            }

            if (msg.data === tripsStatus.finish) {
                if (dispatcherId && dispatcherId.telegramId) {
                    await bot.sendMessage(dispatcherId.telegramId, `Водитель - ${driver.name}, доставил груз - ${load.loadCode}`);
                    await bot.sendMessage(driver.telegramId, `Спасибо за доставленый груз - ${load.loadCode}.\nОповещение о доставке выслана диспетчеру - ${dispatcherId.displayName}`);
                } else {
                    await bot.sendMessage(driver.telegramId, `Что то пошло не так =( обратитесь в компанию`);
                }
            }

            if (msg.data === driversStatus.driving) {
                try {
                    if (dispatcherId && dispatcherId.telegramId) {
                        await Driver.findByIdAndUpdate({_id: driver.id}, {currentStatus: driversStatus.driving});
                        await bot.sendMessage(driver.telegramId, `Ваш статус в дороге "Driving"`);
                        await bot.sendMessage(dispatcherId.telegramId, `Водитель - ${driver.name} поменял статус на ${driversStatus.driving}\nВ пути с грузом - ${load.loadCode}`);
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            if (msg.data === driversStatus.rest) {
                try {
                    if (dispatcherId && dispatcherId.telegramId) {
                        await Driver.findByIdAndUpdate({_id: driver.id}, {currentStatus: driversStatus.rest});
                        await bot.sendMessage(driver.telegramId, `Ваш статус в дороге "Rest"`);
                        await bot.sendMessage(dispatcherId.telegramId, `Водитель - ${driver.name} поменял статус на ${driversStatus.rest}`);
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            if (msg.data === driversStatus.emergency) {
                try {
                    if (dispatcherId && dispatcherId.telegramId) {
                        await Driver.findByIdAndUpdate({_id: driver.id}, {currentStatus: driversStatus.emergency});
                        await bot.sendMessage(driver.telegramId, `Ваш статус в дороге "Emergency"`);
                        await bot.sendMessage(dispatcherId.telegramId, `Водитель - ${driver.name} поменял статус на ${driversStatus.emergency}`);
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            if (msg.data === driversStatus.off) {
                if (dispatcherId && dispatcherId.telegramId) {
                    await bot.sendMessage(driver.telegramId, `Ваш статус в дороге "Off"\nОповещение было отправлено диспетчеру`);
                    await bot.sendMessage(dispatcherId.telegramId, `Водитель - ${driver.name} хочет взять выходной`);
                }
            }
        } catch (e) {
            console.log(e);
        }
    });
};

describe('Telegram Test', () => {
    driversBot();
    let testChat = 1;
    it('should be able to talk with sample bot', async () => {
        const telegramTest = new TelegramTester(bot);
//         await telegramTest.sendUpdate(testChat, '/start')
//             .then((data) => {
//                 console.log(data);
//                 if (data.text === `<b>Компания Supreme Dispatch приветсвует Вас!</b> TestName
// <b>Для продолжения работы напишите свою рабочую почту</b>
// Пример => <b>supremh@gmail.com</b>` && data.form.parse_mode === 'HTML') {
//                     return telegramTest.sendUpdate(testChat, '/start');
//                 }
//                 throw new Error(`(was  ${data.text})`);
//             });
        await telegramTest.sendUpdate(testChat, '/load')
            .then((data) => {
                if (data.text === '1') {

                    return telegramTest.sendUpdate(testChat, '/load');
                }
                throw new Error(`Wrong email! ${data.text}`);
            });
    });
})

// describe('Telegram Test', () => {
//     driversBot();
//     let testChat = 1;
//     it('should be able to talk with sample bot', async () => {
//         const telegramTest = new TelegramTester(bot);
//         await telegramTest.sendUpdate(testChat, 'timur@gmail.com')
//             .then((data) => {
//                 console.log(data);
//                 if (data.text.match(/(@)/g)) {
//                     return true
//                 }
//                 throw new Error('Wrong email!');
//             });
//     });
// })

