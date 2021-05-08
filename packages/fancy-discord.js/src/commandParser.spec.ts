import { getValidator, getQueryBuilderReducer } from './commandParser';

describe('Validators', () => {
    test('const validator', () => {
        const arg = 'test';
        const validator = getValidator(arg);

        expect(validator('test')).toBe(true);
        expect(validator('another text')).toBe(false);
        expect(validator()).toBe(false);
    });

    test('param validator', () => {
        const arg = '[test]';
        const validator = getValidator(arg);

        expect(validator('test')).toBe(true);
        expect(validator('another text')).toBe(true);
        expect(validator()).toBe(false);
    });

    test('optional param validator', () => {
        const arg = '[param]?';
        const validator = getValidator(arg);

        expect(validator('param')).toBe(true);
        expect(validator('another text')).toBe(true);
        expect(validator()).toBe(true);
    });
});

describe('Query Builder Reducer', () => {
    test('const query builder reducer', () => {
        const arg = 'param';
        const reducer = getQueryBuilderReducer(arg);

        expect(reducer({}, 'param')).toStrictEqual({});
        expect(reducer({}, 'jaaj')).toStrictEqual({});

        expect(reducer({ yo: 'text' }, 'param')).toStrictEqual({ yo: 'text' });
        expect(reducer({ yo: 'text' }, 'jaaj')).toStrictEqual({ yo: 'text' });

        expect(reducer({})).toStrictEqual({});
        expect(reducer({ yo: 'text' })).toStrictEqual({ yo: 'text' });
    });

    test('param query builder reducer', () => {
        const arg = '[param]';
        const reducer = getQueryBuilderReducer(arg);

        expect(reducer({}, 'param')).toStrictEqual({ param: 'param' });
        expect(reducer({}, 'jaaj')).toStrictEqual({ param: 'jaaj' });

        expect(reducer({ yo: 'text' }, 'param')).toStrictEqual({ yo: 'text', param: 'param' });
        expect(reducer({ yo: 'text' }, 'jaaj')).toStrictEqual({ yo: 'text', param: 'jaaj' });

        expect(reducer({})).toStrictEqual({ param: undefined });
        expect(reducer({ yo: 'text' })).toStrictEqual({ yo: 'text', param: undefined });
    });

    test('optional param query builder reducer', () => {
        const arg = '[param]?';
        const reducer = getQueryBuilderReducer(arg);

        expect(reducer({}, 'param')).toStrictEqual({ param: 'param' });
        expect(reducer({}, 'jaaj')).toStrictEqual({ param: 'jaaj' });

        expect(reducer({ yo: 'text' }, 'param')).toStrictEqual({ yo: 'text', param: 'param' });
        expect(reducer({ yo: 'text' }, 'jaaj')).toStrictEqual({ yo: 'text', param: 'jaaj' });

        expect(reducer({})).toStrictEqual({ param: undefined });
        expect(reducer({ yo: 'text' })).toStrictEqual({ yo: 'text', param: undefined });
    });
});
