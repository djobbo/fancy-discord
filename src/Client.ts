import { Client as DiscordClient } from 'discord.js';
import { CommandCallback, CommandQuery, FancyDiscordOptions } from './types';
import { commandParser } from './commandParser';

export class Client extends DiscordClient {
    commandPrefix: string;

    constructor(options?: FancyDiscordOptions) {
        const { commandPrefix, ...superOptions } = options ?? {};

        super(superOptions);

        this.commandPrefix = commandPrefix ?? '';
    }

    cmd(path: string, ...callbacks: CommandCallback[]): void {
        const { validators, queryBuilder, callbackSuite } = commandParser(path, ...callbacks);

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
}
