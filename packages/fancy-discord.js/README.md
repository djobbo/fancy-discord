# Fancy Discord.js

`fancy-discord.js` is an extension of the popular package [`discord.js`](https://discord.js.org).

It adds some neat features, like an express-like syntax for commands.

## Installation

**Node.js 14.0.0 or newer is required.**

`npm install fancy-discord.js` or `yarn add fancy-discord.js`

## Example usage

```js
const { Client } = require('fancy-discord.js');

const client = new Client({ commandPrefix: '!' });

client.cmd('say [msg]', (req) => {
    const { query, message } = req;

    message.channel.send(query.msg);
});

client.login('token');
```

## Middlewares

```js
const { Client } = require('fancy-discord.js');

const client = new Client({ commandPrefix: '!' });

const onlyAdmin = (req, next) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    next();
};

client.cmd('say [msg]', onlyAdmin, (req) => {
    const { query, message } = req;

    message.channel.send(query.msg);
});

client.login('token');
```

## Using Base discord.js functionality

The `fancy-discord.js` Client can be used as a 1 on 1 replacement of discord.js Client. It is just an extended version of the `discord.js` Client, so you can use the same syntax for everything.

```js
const { Intents } = require('discord.js');
const { Client } = require('fancy-discord.js');

// Using intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Using discord.js events
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if (msg.content === 'ping') {
        msg.channel.send('pong');
    }
});

client.login('token');
```
