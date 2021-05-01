import { ClientOptions, Message } from 'discord.js';

export interface FancyDiscordOptions extends ClientOptions {
    commandPrefix?: string;
}

export type CommandQuery = Record<string, string | undefined>;
export type CommandCallbackRequest = { query: CommandQuery; message: Message };
export type CommandCallback = (request: CommandCallbackRequest, next?: () => void) => void;
export type CommandArgValidator = (arg?: string) => boolean;
export type CommandQueryBuilderReducer = (query: CommandQuery, arg?: string) => CommandQuery;
export type CommandQueryBuilder = CommandQueryBuilderReducer[];
