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

bot.onText(/\/list/, (msg, match) => {
   request('https://api.exchangeratesapi.io/latest?base=USD', function (error, response, body) {
      const data = JSON.parse(body);
      const chatId = msg.chat.id;
      let currentAll = '';
      for (key in data.rates) {
         currentAll += `${key}: ${data.rates[key].toFixed(2)}\n`
      }

      let all = currentAll;
      bot.sendMessage(chatId, all, { parse_mode: 'Markdown' });
   })
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