import { renderTextElementGroup } from '../createEmbed';
import { IEmbedElement, RenderChildFn } from '../types';

export interface EmbedURL extends IEmbedElement {
    type: 'url';
    props: {
        children: string[];
    };
}

export const renderUrl: RenderChildFn<EmbedURL> = (el) => {
    const { children } = el.props;
    return (embed) => embed.setURL(renderTextElementGroup(children));
};

export const url = ({ children }: { children?: string[] }): EmbedURL => {
    return {
        type: 'url',
        props: {
            children: children ?? [''],
        },
        key: null,
    };
};
