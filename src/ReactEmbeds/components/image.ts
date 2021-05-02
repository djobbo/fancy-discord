import { IEmbedElement } from '../types';

export interface EmbedImage extends IEmbedElement {
    type: 'image';
    props: {
        url: string;
        children: [];
    };
}

export const image = ({ url }: { url: string }): EmbedImage => {
    return {
        type: 'image',
        props: {
            url,
            children: [],
        },
        key: null,
    };
};
