import { CommandArgValidator, CommandQuery, CommandQueryBuilderReducer, CommandQueryBuilder } from './types';

export const commandParser = (
    path: string,
): {
    validators: CommandArgValidator[];
    queryBuilder: CommandQueryBuilder;
} => {
    const pathArgs = path.split(' ');

    return {
        validators: getValidators(pathArgs),
        queryBuilder: getQueryBuilder(pathArgs),
    };
};

export const getValidator = (pathArg: string): CommandArgValidator => {
    if (pathArg.startsWith('[')) {
        if (pathArg.endsWith(']')) return (arg?: string): boolean => !!arg;
        if (pathArg.endsWith(']?')) return (): boolean => true;
    }

    return (arg?: string): boolean => arg === pathArg;
};

const getValidators = (pathArgs: string[]): CommandArgValidator[] => pathArgs.map<CommandArgValidator>(getValidator);

export const getQueryBuilderReducer = (pathArg: string): CommandQueryBuilderReducer => {
    if (pathArg.startsWith('[')) {
        if (pathArg.endsWith(']'))
            return (query: CommandQuery, arg?: string) => ({
                ...query,
                [pathArg.substr(1, pathArg.length - 2)]: arg,
            });

        if (pathArg.endsWith(']?'))
            return (query: CommandQuery, arg?: string) => ({
                ...query,
                [pathArg.substr(1, pathArg.length - 3)]: arg,
            });
    }

    return (query: CommandQuery) => query;
};

export const getQueryBuilder = (pathArgs: string[]): CommandQueryBuilder =>
    pathArgs.map<CommandQueryBuilderReducer>(getQueryBuilderReducer, {});
