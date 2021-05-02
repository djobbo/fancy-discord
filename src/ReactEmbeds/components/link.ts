import { EmbedTextElement, IEmbedElement } from '../types';

export interface EmbedLink extends IEmbedElement {
    type: 'link';
    props: {
        children: EmbedTextElement[];
        href: string;
    };
}

export const link = ({ children, href }: { children?: EmbedTextElement[]; href: string }): EmbedLink => {
    return {
        type: 'link',
        props: {
            children: children ?? [''],
            href,
        },
        key: null,
    };
};
