var SlackBot = require('slackbots');

var BOTS_HASH = {
  'joy': 'xoxb-7994322839-rXfpbNeCkGcGJrHTbtupfpx1'
};

var bot = new SlackBot({
  token: BOTS_HASH['joy'],
  name: 'Дух Радости'
});

bot.on('message', function(data) {
  console.log(data);

  if (data.type === 'message' && data.subtype !== 'bot_message') {
    if (data.text.indexOf('радость') > -1) {
      bot.postMessageToChannel('general', 'Есть такая эмоция – радость!', {
        icon_url: 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-07-21/7994648307_3d28e08b8cc29e28cef9_48.jpg'
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
