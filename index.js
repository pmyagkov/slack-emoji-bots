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

function greetings() {
  return bot.postTo(CHANNEL_ID, 'Привет, котятки! Я снова с вами.', BOT_STATS);
}

function bye() {
  return bot.postTo(CHANNEL_ID, 'Моя работа здесь закончена. До следующего раза, пока!', BOT_STATS);
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
