import { EmbedComponent, IEmbedElement, RenderChildFn } from '../types';

export interface EmbedAuthor extends IEmbedElement {
    type: 'author';
    props: {
        name: string[];
        iconURL?: string;
        url?: string;
        children: [];
    };
}

export const renderAuthor: RenderChildFn<EmbedAuthor> = (el) => {
    const { name, iconURL, url } = el.props;
    return (embed) => embed.setAuthor(name, iconURL, url);
};

export const author: EmbedComponent<EmbedAuthor> = ({ name, iconURL, url }) => {
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
