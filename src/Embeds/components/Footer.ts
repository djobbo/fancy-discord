import { renderTextElement } from '../createEmbed';
import { IEmbedElement, EmbedTextElement, RenderChildFn } from '../types';

export interface EmbedFooter extends IEmbedElement {
    type: 'footer';
    props: {
        children: EmbedTextElement[];
        iconUrl?: string;
    };
}

export const renderFooter: RenderChildFn<EmbedFooter> = (el) => {
    const { children, iconUrl } = el.props;
    return (embed) => embed.setFooter(renderTextElement(children), iconUrl);
};

export const Footer = ({ children, iconUrl }: { children?: EmbedTextElement; iconUrl?: string }): EmbedFooter => {
    return {
        type: 'footer',
        props: {
            children: children ? [children] : [],
            iconUrl,
        },
        key: null,
    };
};
