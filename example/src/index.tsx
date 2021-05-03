import { config } from 'dotenv';
import { Client } from '../../lib';
import { React, createEmbed } from '../../lib/Embeds';
import { TestEmbed } from './TestEmbed';

config();

const { DISCORD_TOKEN } = process.env;

const client = new Client({ commandPrefix: '!' });

client.cmd('say [text]', ({ query, message: { channel, author } }) => {
    const { text } = query;

    const avatar = author.avatarURL();

    const embed = createEmbed(
        <TestEmbed color="#dd2222" title={text ?? 'No Text :('} name={author.username} repeat={2} icon={avatar} />,
    );

    // embed.setFooter('sad', avatar ?? undefined);

    channel.send(embed);
});

client.on('ready', () => {
    console.log(`Connected as ${client.user?.username}`);
});

client.login(DISCORD_TOKEN);
