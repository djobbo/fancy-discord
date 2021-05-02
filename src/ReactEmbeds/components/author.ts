import { IEmbedElement } from '../types';

export interface EmbedAuthor extends IEmbedElement {
    type: 'author';
    props: {
        name: string[];
        iconURL?: string;
        url?: string;
        children: [];
    };
}

export const author = ({ name, iconURL, url }: { name?: string[]; iconURL?: string; url?: string }): EmbedAuthor => {
    return {
        type: 'author',
        props: {
            name: name ?? [''],
            iconURL,
            url,
            children: [],
        },
        key: null,
    };
};
