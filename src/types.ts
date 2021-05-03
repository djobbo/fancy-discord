import { ClientOptions, Message, MessageReaction, PartialUser, User } from 'discord.js';

export interface FancyDiscordOptions extends ClientOptions {
    commandPrefix?: string;
}

export type CommandQuery = Record<string, string | undefined>;
export type CommandCallbackRequest = { query: CommandQuery; message: Message };
export type ReactionCallbackRequest = { reaction: MessageReaction; user: User | PartialUser };
export type CallbackRequest = CommandCallbackRequest | ReactionCallbackRequest;
export type Callback<Request extends CallbackRequest> = (request: Request, next?: () => void) => void;
export type CommandArgValidator = (arg?: string) => boolean;
export type CommandQueryBuilderReducer = (query: CommandQuery, arg?: string) => CommandQuery;
export type CommandQueryBuilder = CommandQueryBuilderReducer[];
