import { renderTextElement } from '../createEmbed';
import { EmbedTextElement, IEmbedElement, RenderChildFn } from '../types';

export interface EmbedDescription extends IEmbedElement {
    type: 'description';
    props: {
        children: EmbedTextElement[];
    };
}

export const renderDescription: RenderChildFn<EmbedDescription> = (el) => (embed) =>
    embed.setDescription(renderTextElement(el.props.children));

export const Description = ({ children }: { children?: EmbedTextElement }): EmbedDescription => {
    return {
        type: 'description',
        props: {
            children: children ? [children] : [],
        },
        key: null,
    };
};
