var SlackBot = require('slackbots');

var BOTS_HASH = {
  'joy': 'xoxb-7994322839-rXfpbNeCkGcGJrHTbtupfpx1'
};

var bot = new SlackBot({
  token: BOTS_HASH['joy'],
  name: 'Дух Радости'
});
var BOT_STATS = {
  icon_url: 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-07-21/7994648307_3d28e08b8cc29e28cef9_48.jpg',
  attachments: [
    { image_url: 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-07-21/7994648307_3d28e08b8cc29e28cef9_48.jpg'}
  ]
};

var CHANNEL_ID = 'G0DED7GRJ';


var GREETINGS = [
  'Привет, котятки! Я снова с вами.',
  'А вот и я!',
  'Поднимите мне веки!',
  'А не пойти бы вам с вашими сетчками? Лааадно, помогу.',
  'Мааам, ну еще 5 минут!'
];

var BYE = [
  'Моя работа здесь закончена. До следующего раза, пока!',
  'Ну наконец-то все закончено!',
  'Надеюсь, оно того стоило. Расскажите потом.',
  'Приятного прослушивания, дети.'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function choose(arr) {
  return arr[getRandomInt(0, arr.length)];
}

function greetings() {
  return bot.postTo(CHANNEL_ID, choose(GREETINGS), BOT_STATS);
}

function bye() {
  return bot.postTo(CHANNEL_ID, choose(BYE), BOT_STATS);
}

function count(i, upper, channel) {
  bot.postTo(channel, '' + i, BOT_STATS);

  if (i + 1 <= upper) {

    setTimeout(function () {
      count(i + 1, upper, channel);
    }, 2000);
  }

}

process.on('SIGINT', function() {
  bye().then(process.exit, process.exit);
});

greetings();

bot.on('message', function(data) {
  console.log(data);

  if (data.type === 'message' && data.subtype !== 'bot_message') {
    if (/^count bitch!$/.test(data.text)) {
      setTimeout(function () {
        count(1, 3, data.channel);
      });
    }
  }

  /*// more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
    icon_emoji: ':cat:'
  };

  bot.postMessageToChannel('general', 'meow!', params);
  bot.postMessageToUser('username', 'meow!', params);
  bot.postMessageToGroup('private_group', 'meow!', params);*/
});
