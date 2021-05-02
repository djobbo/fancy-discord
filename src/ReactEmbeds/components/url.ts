import { IEmbedElement } from '../types';

export interface EmbedURL extends IEmbedElement {
    type: 'url';
    props: {
        children: string[];
    };
}

export const url = ({ children }: { children?: string[] }): EmbedURL => {
    return {
        type: 'url',
        props: {
            children: children ?? [''],
        },
        key: null,
    };
};
