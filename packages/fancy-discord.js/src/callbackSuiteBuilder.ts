import { Callback, CallbackRequest } from './types';

export const getCallbackSuite = <Request extends CallbackRequest>(
    callbacks: Callback<Request>[],
): Callback<Request> => (req) =>
    callbacks.reduceRight<Callback<Request>>(
        (callback, current) => () => current(req, () => callback(req)),
        () => ({}),
    )(req);
