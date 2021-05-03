import { React } from '../React';
import { MessageEmbed } from 'discord.js';
import { Color, renderColor, EmbedColor } from './Color';

const testColorObj: EmbedColor = {
    type: 'color',
    props: {
        hex: '#faa000',
        children: [],
    },
    key: null,
};

describe('Embed Color', () => {
    it('creates color object', () => {
        const colorObj = Color({ hex: '#faa000' });
        expect(colorObj).toStrictEqual(testColorObj);
    });

    it('creates color object with JSX', () => {
        const colorObjJSX = <Color hex="#faa000" />;
        expect(colorObjJSX).toStrictEqual(testColorObj);
    });

    it('renders color', () => {
        const embed = new MessageEmbed();
        const renderColorObj = renderColor(testColorObj);
        expect(typeof renderColorObj).toBe('function');
        renderColorObj(embed);
        expect(embed).toEqual(new MessageEmbed({ color: '#faa000' }));
    });
});
