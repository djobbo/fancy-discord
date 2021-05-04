import { React } from '../React';
import { MessageEmbed } from 'discord.js';
import { Description, renderDescription, EmbedDescription } from './Description';

const testEmptyDescriptionObj: EmbedDescription = {
    type: 'description',
    props: {
        children: [[]],
    },
    key: null,
};

const testDescriptionObj: EmbedDescription = {
    type: 'description',
    props: {
        children: [['hello']],
    },
    key: null,
};

describe('Embed Description', () => {
    it('creates empty description object', () => {
        const descriptionObj = Description({ children: [] });
        expect(descriptionObj).toStrictEqual(testEmptyDescriptionObj);
    });

    it('creates empty description object with JSX', () => {
        const descriptionObjJSX = <Description />;
        expect(descriptionObjJSX).toStrictEqual(testEmptyDescriptionObj);
    });

    it('renders empty description', () => {
        const embed = new MessageEmbed();
        const renderDescriptionObj = renderDescription(testEmptyDescriptionObj);
        expect(typeof renderDescriptionObj).toBe('function');
        renderDescriptionObj(embed);
        expect(embed).toEqual(new MessageEmbed({ description: '' }));
    });

    it('creates description object', () => {
        const descriptionObj = Description({ children: ['hello'] });
        expect(descriptionObj).toStrictEqual(testDescriptionObj);
    });

    it('creates description object with JSX', () => {
        const descriptionObjJSX = <Description>hello</Description>;
        expect(descriptionObjJSX).toStrictEqual(testDescriptionObj);
    });

    it('renders description', () => {
        const embed = new MessageEmbed();
        const renderDescriptionObj = renderDescription(testDescriptionObj);
        expect(typeof renderDescriptionObj).toBe('function');
        renderDescriptionObj(embed);
        expect(embed).toEqual(new MessageEmbed({ description: 'hello' }));
    });
});
