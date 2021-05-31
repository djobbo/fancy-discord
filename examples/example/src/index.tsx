import { config } from 'dotenv';
import { Client, CommandCallback } from 'fancy-discord.js';
import { React, createEmbed } from 'fancy-discord.js/embeds';
import { getEmojiString } from 'fancy-discord.js/emojis';
import { TestEmbed } from './TestEmbed';

config();

const { DISCORD_TOKEN } = process.env;

const client = new Client({ commandPrefix: '!' });

const isTextChannel: CommandCallback = ({ message }, next) => {
    if (message.channel.type !== 'text') return;
    next?.();
};

client.cmd('say [text]', isTextChannel, async ({ query, message: { channel, author } }) => {
    const { text } = query;

    const avatar = author.avatarURL();

    const embed = createEmbed(
        <TestEmbed color="#dd2222" name={author.username} text={text ?? ''} icon={avatar ?? undefined} />,
    );

    try {
        const msg = await channel.send(embed);

        const emojis = ['😀', '🥴'];
        client.addReactions(msg, emojis);

        client.onReactionAdd([msg.id], emojis, async ({ reaction, user }) => {
            if (user.bot) return;

            await reaction.message.reply(getEmojiString(reaction.emoji));
            await reaction.users.remove(user.id);

            await reaction.message.edit(
                createEmbed(
                    <TestEmbed
                        color="#dd2222"
                        name={user.username ?? ''}
                        text={text ?? ''}
                        icon={user.avatarURL() ?? undefined}
                    />,
                ).addField('emoji', `emoji: ${reaction.emoji}`),
            );
        });
    } catch (e) {
        console.error(e);
    }
});

client.on('ready', () => {
    console.log(`Connected as ${client.user?.username}`);
});

client.login(DISCORD_TOKEN);
