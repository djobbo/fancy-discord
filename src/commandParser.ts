import {
    CommandArgValidator,
    CommandCallback,
    CommandQuery,
    CommandQueryBuilderReducer,
    CommandQueryBuilder,
} from './types';

export const commandParser = (
    path: string,
    ...callbacks: CommandCallback[]
): {
    validators: CommandArgValidator[];
    queryBuilder: CommandQueryBuilder;
    callbackSuite: CommandCallback;
} => {
    const pathArgs = path.split(' ');

    return {
        validators: getValidators(pathArgs),
        queryBuilder: getQueryBuilder(pathArgs),
        callbackSuite: getCallbackSuite(callbacks),
    };
};

const getValidators = (pathArgs: string[]): CommandArgValidator[] => {
    return pathArgs.map<CommandArgValidator>((pathArg) => {
        if (pathArg.startsWith('[')) {
            if (pathArg.endsWith(']')) return (arg?: string): boolean => !!arg;
            if (pathArg.endsWith(']?')) return (): boolean => true;
        }

        return (arg?: string): boolean => arg === pathArg;
    });
};

const getQueryBuilder = (pathArgs: string[]): CommandQueryBuilder =>
    pathArgs.map<CommandQueryBuilderReducer>((pathArg) => {
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

const getCallbackSuite = (callbacks: CommandCallback[]): CommandCallback => (req) =>
    callbacks.reduceRight<CommandCallback>(
        (callback, current) => () => current(req, () => callback(req)),
        () => ({}),
    )(req);
