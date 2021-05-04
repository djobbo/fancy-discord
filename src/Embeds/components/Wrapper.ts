import { IEmbedElement, EmbedChildElement } from '../types';

export interface EmbedWrapper extends IEmbedElement {
    type: 'wrapper';
    props: {
        children: EmbedChildElement[];
    };
}

export const Wrapper = ({ children }: { children?: EmbedChildElement | EmbedChildElement[] }): EmbedWrapper => {
    return {
        type: 'wrapper',
        props: {
            children: children ? (Array.isArray(children) ? children : [children]) : [],
        },
        key: null,
    };
};
