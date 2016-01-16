var SlackBot = require('slackbots');
var _ = require('lodash');

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

var CHANNEL = 'count_bitch';

var COUNT_PHRASES = [
  'count bitch!',
  'каунтбич'
];

var READY_PHRASES = [
  'редибич'
];

var GREETINGS_PHRASES = [
  'Привет, котятки! Я снова с вами.',
  'А вот и я!',
  'Поднимите мне веки!',
  'А не пойти бы вам с вашими сетчками? Лааадно, помогу.',
  'Мааам, ну еще 5 минут!'
];

var BYE_PHRASES = [
  'Моя работа здесь закончена. До следующего раза, пока!',
  'Ну наконец-то все закончено!',
  'Надеюсь, оно того стоило. Расскажите потом.',
  'Приятного прослушивания, дети.'
];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function choose(arr) {
  return arr[getRandom(0, arr.length)];
}

function sayGreetings() {
  return bot.postTo(CHANNEL, choose(GREETINGS_PHRASES), BOT_STATS);
}

function sayBye() {
  return bot.postTo(CHANNEL, choose(BYE_PHRASES), BOT_STATS);
}

function count(i, upper, channel) {
  bot.postTo(channel, '' + i, BOT_STATS);

  if (i + 1 <= upper) {

    setTimeout(function () {
      count(i + 1, upper, channel);
    }, 2000);
  }
}

function trackIncomingMessages(channel) {
  var channelId;

  var readyBitches = {};
  var members;

  bot.getGroup(channel)
    .then(function (data) {
      channelId = data.id;
      console.log('GROUP', data);

      members = data.members;

      data.members.forEach(function (member) {
        readyBitches[member] = false;
      });

    }).then(function () {
      bot.on('message', function(data) {
        console.log(data);
        if (data.channel === channelId && data.type === 'message' && data.subtype !== 'bot_message') {

          var success = false;
          READY_PHRASES.forEach(function (phrase) {
            if (phrase === data.text) {
              success = true;
            }
          });

          if (success) {
            readyBitches[data.user] = true;

            console.log('READY', readyBitches);

            var readyUsersCount = _(readyBitches).map(function (readyBitch) {
              return readyBitch;
            }).filter(function (value) {
              return value;
            }).value().length;

            if (readyUsersCount === members.length - 1) {
              setTimeout(function () {
                count(1, 3, channel);
              }, 1000);
            }
          }
        }
      });
    });
}

sayGreetings();

trackIncomingMessages(CHANNEL);

process.on('SIGINT', function() {
  sayBye().then(process.exit, process.exit);
});
