import { config } from 'dotenv';
import { Client, createEmbed, React } from '../../lib';
import { TestEmbed } from './TestEmbed';

config();

const { DISCORD_TOKEN } = process.env;

const client = new Client({ commandPrefix: '!' });

client.cmd('say [text]', ({ query, message: { channel, author } }) => {
    const { text } = query;

    const embed = createEmbed(
        <TestEmbed color="#dd2222" title={text ?? 'No Text :('} name={author.username} repeat={3} />,
    );
    channel.send(embed);
});

client.on('ready', () => {
    console.log(`Connected as ${client.user?.username}`);
});

client.login(DISCORD_TOKEN);
