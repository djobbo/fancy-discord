import { Client as DiscordClient, Message } from 'discord.js';
import { Callback, CommandCallbackRequest, CommandQuery, FancyDiscordOptions, ReactionCallbackRequest } from './types';
import { commandParser } from './commandParser';
import { getCallbackSuite } from './callbackSuiteBuilder';

export class Client extends DiscordClient {
    commandPrefix: string;

    constructor(options?: FancyDiscordOptions) {
        const { commandPrefix, ...superOptions } = options ?? {};

        super(superOptions);

        this.commandPrefix = commandPrefix ?? '';
    }

    cmd(path: string, ...callbacks: Callback<CommandCallbackRequest>[]): void {
        const { validators, queryBuilder } = commandParser(path);
        const callbackSuite = getCallbackSuite(callbacks);

        this.on('message', (message) => {
            const [cmd, ...otherArgs] = message.content.split(' ');

            if (!cmd.startsWith(this.commandPrefix)) return;

            const args = [cmd.substr(this.commandPrefix.length), ...otherArgs];

            const validated = validators.every((validate, i) => validate(args[i]));
            if (!validated) return;

            const query: CommandQuery = args.reduce<CommandQuery>((acc, arg, i) => queryBuilder[i](acc, arg), {});

            callbackSuite({ query, message });
        });
    }

    onReactionAdd<Emoji extends string>(
        messages: string[],
        emojis: Emoji[],
        ...callbacks: Callback<ReactionCallbackRequest>[]
    ): void {
        const callbackSuite = getCallbackSuite(callbacks);

        this.on('messageReactionAdd', (reaction, user) => {
            if (user.bot) return;
            if (!messages.includes(reaction.message.id)) return;
            if (!emojis.includes(reaction.emoji.name as Emoji)) return;

            callbackSuite({ reaction, user });
        });
    }

    addReactions(message: Message, emojis: string[]): void {
        for (const emoji of emojis) {
            message.react(emoji);
        }
    }
}
