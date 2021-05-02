import { IEmbedElement, EmbedTextElement } from '../types';

export interface EmbedSpan extends IEmbedElement {
    type: 'span';
    props: {
        children: EmbedTextElement[];
        bold: boolean;
        italic: boolean;
    };
}

export const span = ({
    children,
    bold = false,
    italic = false,
}: {
    children?: EmbedTextElement[];
    bold?: boolean;
    italic?: boolean;
}): EmbedSpan => {
    return {
        type: 'span',
        props: {
            children: children ?? [''],
            bold,
            italic,
        },
        key: null,
    };
};
