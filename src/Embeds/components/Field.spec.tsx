import { React } from '../React';
import { MessageEmbed } from 'discord.js';
import { Field, renderField, EmbedField } from './Field';

const testFieldObj: EmbedField = {
    type: 'field',
    props: {
        title: ['a title'],
        children: ['hello'],
        inline: false,
    },
    key: null,
};

const testEmptyFieldObj: EmbedField = {
    type: 'field',
    props: {
        title: ['another title'],
        children: [],
        inline: false,
    },
    key: null,
};

const testEmptyTitleObj: EmbedField = {
    type: 'field',
    props: {
        title: [''],
        children: ['hii'],
        inline: false,
    },
    key: null,
};

const testInlineFieldObj: EmbedField = {
    type: 'field',
    props: {
        title: ['inlinee'],
        children: ['a'],
        inline: true,
    },
    key: null,
};

describe('Embed Field', () => {
    describe('Field Object', () => {
        it('creates object', () => {
            const fieldObj = Field({ title: 'a title', children: ['hello'] });
            expect(fieldObj).toStrictEqual(testFieldObj);
        });

        it('creates object with JSX', () => {
            const fieldObjJSX = <Field title="a title">hello</Field>;
            expect(fieldObjJSX).toStrictEqual(testFieldObj);
        });

        it('renders', () => {
            const embed = new MessageEmbed();
            const renderFieldObj = renderField(testFieldObj);
            expect(typeof renderFieldObj).toBe('function');
            renderFieldObj(embed);
            expect(embed).toEqual(new MessageEmbed({ fields: [{ name: 'a title', value: 'hello', inline: false }] }));
        });
    });

    describe('Empty Field Content', () => {
        it('creates object', () => {
            const fieldObj = Field({ title: 'another title' });
            expect(fieldObj).toStrictEqual(testEmptyFieldObj);
        });

        it('creates object with JSX', () => {
            const fieldObjJSX = <Field title="another title" />;
            expect(fieldObjJSX).toStrictEqual(testEmptyFieldObj);
        });

        it('renders', () => {
            const embed = new MessageEmbed();
            const renderFieldObj = renderField(testEmptyFieldObj);
            expect(typeof renderFieldObj).toBe('function');
            expect(() => renderFieldObj(embed)).toThrow();
        });
    });

    describe('Empty Field Title', () => {
        it('creates object', () => {
            const fieldObj = Field({ title: '', children: ['hii'] });
            expect(fieldObj).toStrictEqual(testEmptyTitleObj);
        });

        it('creates object with JSX', () => {
            const fieldObjJSX = <Field title="">hii</Field>;
            expect(fieldObjJSX).toStrictEqual(testEmptyTitleObj);
        });

        it('renders', () => {
            const embed = new MessageEmbed();
            const renderFieldObj = renderField(testEmptyTitleObj);
            expect(typeof renderFieldObj).toBe('function');
            expect(() => renderFieldObj(embed)).toThrow();
        });
    });

    describe('Inline Field', () => {
        it('creates object', () => {
            const fieldObj = Field({ title: 'inlinee', children: ['a'], inline: true });
            expect(fieldObj).toStrictEqual(testInlineFieldObj);
        });

        it('creates object with JSX', () => {
            const fieldObjJSX = (
                <Field title="inlinee" inline>
                    a
                </Field>
            );
            expect(fieldObjJSX).toStrictEqual(testInlineFieldObj);
        });

        it('renders', () => {
            const embed = new MessageEmbed();
            const renderFieldObj = renderField(testInlineFieldObj);
            expect(typeof renderFieldObj).toBe('function');
            renderFieldObj(embed);
            expect(embed).toEqual(new MessageEmbed({ fields: [{ name: 'inlinee', value: 'a', inline: true }] }));
        });
    });
});
