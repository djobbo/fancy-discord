import { Client as DiscordClient, ClientOptions, Message } from 'discord.js';

export interface FancyDiscordOptions extends ClientOptions {
    commandPrefix?: string;
}

export type CommandQuery = Record<string, string>;
export type CommandCallbackRequest = { query: CommandQuery; message: Message };
export type CommandCallback = (request: CommandCallbackRequest, next?: () => void) => void;
export type CommandArgValidator = (arg?: string) => boolean;

export class Client extends DiscordClient {
    commandPrefix: string;

    constructor(options?: FancyDiscordOptions) {
        const { commandPrefix, ...superOptions } = options ?? {};
        super(superOptions);
        this.commandPrefix = commandPrefix ?? '';
    }

    cmd(path: string, ...callbacks: CommandCallback[]): void {
        const pathArgs = path.split(' ');
        const validators = pathArgs.map<CommandArgValidator>((pathArg) => {
            if (pathArg.startsWith('[')) {
                if (pathArg.endsWith(']')) return (arg?: string): boolean => !!arg;
                if (pathArg.endsWith(']?')) return (): boolean => true;
            }

            return (arg?: string): boolean => arg === pathArg;
        });

        const queryBuilder = pathArgs.map((pathArg) => {
            if (pathArg.startsWith('[')) {
                if (pathArg.endsWith(']'))
                    return (query: CommandQuery, arg: string) => ({
                        ...query,
                        [pathArg.substr(1, pathArg.length - 2)]: arg,
                    });
                if (pathArg.endsWith(']?'))
                    return (query: CommandQuery, arg: string) => ({
                        ...query,
                        [pathArg.substr(1, pathArg.length - 3)]: arg,
                    });
            }

            return (query: CommandQuery) => query;
        }, {});

        const callbackSuite: CommandCallback = (req) =>
            callbacks.reduceRight<CommandCallback>(
                (callback, current) => () => current(req, () => callback(req)),
                () => ({}),
            )(req);

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
