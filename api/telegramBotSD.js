// const TelegramApi = require('node-telegram-bot-api');
// const Load = require("./models/Load");
// const Driver = require("./models/Driver");
//
// const token = "5488385805:AAGNvotjoClkC-YtvW92CfmeWTjVlvByvdc";
//
// const bot = new TelegramApi(token, {polling: true});
// module.exports = driversBot = () => {
//     bot.on('message', async msg => {
//         const text = msg.text;
//         const chatId = msg.chat.id;
//
//         if (text === '/start') {
//             const htmlStart = `<b>Supreme Dispatch welcomes you</b> ${msg.from.first_name}
// <b>For continuation, enter your email</b>
// Example => <b>dispatch@gmail.com</b>`
//             return await bot.sendMessage(chatId, htmlStart, {
//                 parse_mode: 'HTML'
//             });
//         }
//
//         if (text.match(/(@)/g)) {
//             try {
//                 const driver = await Driver.findOne({email: text});
//                 if (driver) {
//                     await Driver.findByIdAndUpdate({_id: driver.id}, {telegramId: msg.from.id});
//                     return await bot.sendMessage(chatId, 'Your telegram connect to your loads with bot\nNow u can see which load u have by using command /load');
//                 } else {
//                     return await bot.sendMessage(chatId, 'You are not registered');
//                 }
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//
//         if (text === '/load') {
//             const driver = await Driver.findOne({telegramId: msg.from.id});
//             if (!driver) {
//                 return await bot.sendMessage(chatId, 'You are not registered');
//             }
//             const load = await Load.find({driverId: driver.id});
//             const upcomingLoad = load[0];
//             if (upcomingLoad.status === 'upcoming') {
//                 const htmlLoad =
//                     `<b>Load\'s Code</b>: ${upcomingLoad.loadCode}
// <b>Price</b>: ${upcomingLoad.price}
// <b>Miles</b>: ${upcomingLoad.miles}
// <b>Date Pick Up</b>: ${upcomingLoad.datePU}
// <b>Date Delivery</b>: ${upcomingLoad.dateDEL}
// <b>Location Pick Up from</b>: ${upcomingLoad.pu} => <b>Location Delivery to</b>: ${upcomingLoad.del}`
//                 return await bot.sendMessage(driver.telegramId, htmlLoad, {
//                     parse_mode: 'HTML'
//                 });
//             } else {
//                 return await bot.sendMessage(chatId, 'You don\'t have load');
//             }
//         }
//     });
// };