import { IEmbedElement, EmbedChildElement } from '../types';

export interface EmbedWrapper extends IEmbedElement {
    type: 'wrapper';
    props: {
        children: (EmbedChildElement | EmbedChildElement[])[];
    };
}

export const Wrapper = ({ children }: { children?: EmbedChildElement[] }): EmbedWrapper => {
    return {
        type: 'wrapper',
        props: {
            children: children ?? [],
        },
        key: null,
    };
};
