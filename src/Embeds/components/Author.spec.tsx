import { React } from '../React';
import { MessageEmbed } from 'discord.js';
import { Author, renderAuthor, EmbedAuthor } from './Author';

const testAuthorObj: EmbedAuthor = {
    type: 'author',
    props: {
        name: 'hello',
        iconURL: 'iconurl',
        url: 'this_url',
        children: [],
    },
    key: null,
};

describe('Embed Author', () => {
    it('creates author object', () => {
        const authorObj = Author({ name: 'hello', iconURL: 'iconurl', url: 'this_url' });
        expect(authorObj).toStrictEqual(testAuthorObj);
    });

    it('creates author object with JSX', () => {
        const authorObjJSX = <Author name="hello" iconURL="iconurl" url="this_url" />;
        expect(authorObjJSX).toStrictEqual(testAuthorObj);
    });

    it('renders author', () => {
        const embed = new MessageEmbed();
        const renderAuthorObj = renderAuthor(testAuthorObj);
        expect(typeof renderAuthorObj).toBe('function');
        renderAuthorObj(embed);
        expect(embed).toEqual(new MessageEmbed({ author: { name: 'hello', url: 'this_url', iconURL: 'iconurl' } }));
    });
});
