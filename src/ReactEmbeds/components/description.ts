import { EmbedTextElement, IEmbedElement } from '../types';

export interface EmbedDescription extends IEmbedElement {
    type: 'description';
    props: {
        children: EmbedTextElement[];
    };
}

export const description = ({ children }: { children?: EmbedTextElement[] }): EmbedDescription => {
    return {
        type: 'description',
        props: {
            children: children ?? [''],
        },
        key: null,
    };
};
