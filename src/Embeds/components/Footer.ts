import { renderTextElementGroup } from '../createEmbed';
import { IEmbedElement, EmbedTextElement, RenderChildFn, EmbedComponent } from '../types';

export interface EmbedFooter extends IEmbedElement {
    type: 'footer';
    props: {
        children: EmbedTextElement[];
        iconUrl?: string;
    };
}

export const renderFooter: RenderChildFn<EmbedFooter> = (el) => {
    const { children, iconUrl } = el.props;
    return (embed) => embed.setFooter(renderTextElementGroup(children), iconUrl);
};

export const Footer: EmbedComponent<EmbedFooter> = ({ children = [''], ...props }) => {
    return {
        type: 'footer',
        props: {
            children,
            ...props,
        },
        key: null,
    };
};
