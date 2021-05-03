import { IEmbedElement, RenderChildFn } from '../types';

export interface EmbedImage extends IEmbedElement {
    type: 'image';
    props: {
        url: string;
        children: [];
    };
}

export const renderImage: RenderChildFn<EmbedImage> = (el) => {
    const { url } = el.props;
    return (embed) => embed.setImage(url);
};

export const Image = ({ url }: { url: string }): EmbedImage => {
    return {
        type: 'image',
        props: {
            url,
            children: [],
        },
        key: null,
    };
};
