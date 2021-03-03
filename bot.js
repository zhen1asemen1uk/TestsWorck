const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '1596699493:AAFrTx0QmUITjhHnRDOksM7hgx4GCCb37tw';

const bot = new TelegramBot(token, { polling: true });




bot.onText(/\/curse/, (msg, match) => {
   const chatId = msg.chat.id;
   bot.sendMessage(chatId, 'Оберіть валюту яка вас цікавить', {
      reply_markup: {
         inline_keyboard: [[{
            text: 'USD',
            callback_data: 'USD'
         }, {
            text: 'EUR',
            callback_data: 'EUR'
         }, {
            text: 'RUB',
            callback_data: 'RUB'
         },],
         [{
            text: 'MYR',
            callback_data: 'MYR'
         }, {
            text: 'DKK',
            callback_data: 'DKK'
         }, {
            text: 'CAD',
            callback_data: 'CAD'
         }, {
            text: 'HKD',
            callback_data: 'HKD'
         }, {
            text: 'ISK',
            callback_data: 'ISK'
         }, {
            text: 'PHP',
            callback_data: 'PHP'
         },], [{
            text: 'HUF',
            callback_data: 'HUF'
         }, {
            text: 'CZK',
            callback_data: 'CZK'
         }, {
            text: 'GBP',
            callback_data: 'GBP'
         }, {
            text: 'RON',
            callback_data: 'RON'
         }, {
            text: 'SEK',
            callback_data: 'SEK'
         }, {
            text: 'IDR',
            callback_data: 'IDR'
         }], [{
            text: 'CHF',
            callback_data: 'CHF'
         }, {
            text: 'INR',
            callback_data: 'INR'
         }, {
            text: 'BRL',
            callback_data: 'BRL'
         }, {
            text: 'HRK',
            callback_data: 'HRK'
         }, {
            text: 'JPY',
            callback_data: 'JPY'
         }, {
            text: 'THB',
            callback_data: 'THB'
         }], [{
            text: 'BGN',
            callback_data: 'BGN'
         }, {
            text: 'TRY',
            callback_data: 'TRY'
         }, {
            text: 'CNY',
            callback_data: 'CNY'
         }, {
            text: 'NOK',
            callback_data: 'NOK'
         }, {
            text: 'NZD',
            callback_data: 'NZD'
         }, {
            text: 'ZAR',
            callback_data: 'ZAR'
         }], [{
            text: 'MXN',
            callback_data: 'MXN'
         }, {
            text: 'SGD',
            callback_data: 'SGD'
         }, {
            text: 'AUD',
            callback_data: 'AUD'
         }, {
            text: 'KRW',
            callback_data: 'KRW'
         }, {
            text: 'ILS',
            callback_data: 'ILS'
         }, {
            text: 'PLN',
            callback_data: 'PLN'
         }]
         ]
      }
   });
});

bot.on('callback_query', query => {
   const id = query.message.chat.id;
   request('https://api.exchangeratesapi.io/latest?base=USD', function (error, response, body) {
      const data = JSON.parse(body);

      for (key in data.rates) {
         if (key === query.data) {
            curseValute = `1 ${data.base} = ${data.rates[key].toFixed(2)} ${key} `
         }
      }
      bot.sendMessage(id, curseValute, { parse_mode: 'Markdown' });
   })
});

let arrTime = [];
let arrCurse = [];

bot.onText(/\/list/, (msg, match) => {
   request('https://api.exchangeratesapi.io/latest?base=USD', function (error, response, body) {
      const data = JSON.parse(body);
      const chatId = msg.chat.id;
    
      let all = '';
      let currentAll = '';

      let unix_timestamp = Date.now();
      let date = new Date(unix_timestamp);
      let minutes = date.getMinutes();

      if (arrTime >= 60) {
         arrTime = arrTime - 60;
      } else {
         if (arrTime > minutes) {
            all = arrCurse.join(' ');
         } else {
            arrTime = [];
            arrCurse = [];

            arrTime.push(minutes + 10);

            for (key in data.rates) {
               currentAll += `${key}: ${data.rates[key].toFixed(2)}\n`
            }
            arrCurse.push(currentAll);

            all = currentAll;
         }
      }
      bot.sendMessage(chatId, all, { parse_mode: 'Markdown' });
   })
});

bot.onText(/\/history/, (msg, match) => {
   const chatId = msg.chat.id;
   bot.sendMessage(chatId, 'Оберіть валюту про яку хочете дізнатися за тиждень', {
      reply_markup: {
         inline_keyboard: [[{
            text: 'USD',
            callback_data: 'USD'
         }, {
            text: 'EUR',
            callback_data: 'EUR'
         }, {
            text: 'RUB',
            callback_data: 'RUB'
         },],
         [{
            text: 'MYR',
            callback_data: 'MYR'
         }, {
            text: 'DKK',
            callback_data: 'DKK'
         }, {
            text: 'CAD',
            callback_data: 'CAD'
         }, {
            text: 'HKD',
            callback_data: 'HKD'
         }, {
            text: 'ISK',
            callback_data: 'ISK'
         }, {
            text: 'PHP',
            callback_data: 'PHP'
         },], [{
            text: 'HUF',
            callback_data: 'HUF'
         }, {
            text: 'CZK',
            callback_data: 'CZK'
         }, {
            text: 'GBP',
            callback_data: 'GBP'
         }, {
            text: 'RON',
            callback_data: 'RON'
         }, {
            text: 'SEK',
            callback_data: 'SEK'
         }, {
            text: 'IDR',
            callback_data: 'IDR'
         }], [{
            text: 'CHF',
            callback_data: 'CHF'
         }, {
            text: 'INR',
            callback_data: 'INR'
         }, {
            text: 'BRL',
            callback_data: 'BRL'
         }, {
            text: 'HRK',
            callback_data: 'HRK'
         }, {
            text: 'JPY',
            callback_data: 'JPY'
         }, {
            text: 'THB',
            callback_data: 'THB'
         }], [{
            text: 'BGN',
            callback_data: 'BGN'
         }, {
            text: 'TRY',
            callback_data: 'TRY'
         }, {
            text: 'CNY',
            callback_data: 'CNY'
         }, {
            text: 'NOK',
            callback_data: 'NOK'
         }, {
            text: 'NZD',
            callback_data: 'NZD'
         }, {
            text: 'ZAR',
            callback_data: 'ZAR'
         }], [{
            text: 'MXN',
            callback_data: 'MXN'
         }, {
            text: 'SGD',
            callback_data: 'SGD'
         }, {
            text: 'AUD',
            callback_data: 'AUD'
         }, {
            text: 'KRW',
            callback_data: 'KRW'
         }, {
            text: 'ILS',
            callback_data: 'ILS'
         }, {
            text: 'PLN',
            callback_data: 'PLN'
         }]
         ]
      }
   })


   bot.on('callback_query', query => {
      const id = query.message.chat.id;

      let unix_timestamp = Date.now();
      let date = new Date(unix_timestamp) ;

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month >= 0 && month <= 9) {
         month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
         day = "0" + day;
      }

      let dateNow = `${year}-${month}-${day}`;
      let dateWeekAgo = date - 1000 * 60 * 60 * 24 * 7;

      dateWeekAgo = new Date(dateWeekAgo);

      let yearWeekAgo = dateWeekAgo.getFullYear();
      let monthWeekAgo = dateWeekAgo.getMonth() + 1;
      let dayWeekAgo = dateWeekAgo.getDate();

      if (monthWeekAgo >= 0 && monthWeekAgo <= 9) {
         monthWeekAgo = "0" + monthWeekAgo;
      }
      if (dayWeekAgo >= 0 && dayWeekAgo <= 9) {
         dayWeekAgo = "0" + dayWeekAgo;
      }
//високосний рік не так працює, тому що система UTC не враховує його наскільки вказано в інтернеті
      let dateBack = `${yearWeekAgo}-${monthWeekAgo}-${dayWeekAgo}`;

      request(`https://api.exchangeratesapi.io/history?start_at=${dateBack}&end_at=${dateNow}&base=USD&symbols=${query.data}`, function (error, response, body) {
         const data = JSON.parse(body);

         let dataCurse = '';

         for (key in data.rates) {
            let valueObj = Object.values(data.rates[key]);
            valueObj = Number(valueObj);

            dataCurse += `${key}: 1 USD = ${valueObj.toFixed(2)} ${query.data}\n`
         }
         bot.sendMessage(id, dataCurse, { parse_mode: 'Markdown' });
      })
   })
})

