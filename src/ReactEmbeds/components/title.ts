import { IEmbedElement, EmbedTextElement } from '../types';

export interface EmbedTitle extends IEmbedElement {
    type: 'title';
    props: {
        children: EmbedTextElement[];
    };
}

export const title = ({ children }: { children?: EmbedTextElement[] }): EmbedTitle => {
    return {
        type: 'title',
        props: {
            children: children ?? [''],
        },
        key: null,
    };
};
