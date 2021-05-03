import { React } from '../React';
import { Break, renderLineBreak, EmbedLineBreak } from './Break';

const testLineBreakObj: EmbedLineBreak = {
    type: 'br',
    props: {
        children: [],
    },
    key: null,
};

describe('Embed Line Break', () => {
    it('creates line break object', () => {
        const lineBreakObj = Break({});
        expect(lineBreakObj).toStrictEqual(testLineBreakObj);
    });

    it('creates  line break object with JSX', () => {
        const authorObjJSX = <Break />;
        expect(authorObjJSX).toStrictEqual(testLineBreakObj);
    });

    it('renders line break', () => {
        const renderLineBreakObj = renderLineBreak(testLineBreakObj);
        expect(typeof renderLineBreakObj).toBe('string');
        expect(renderLineBreakObj).toBe('\n');
    });
});
