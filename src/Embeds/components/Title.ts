import { IEmbedElement, EmbedTextElement, RenderChildFn } from '../types';
import { renderTextElementGroup } from '../createEmbed';

export interface EmbedTitle extends IEmbedElement {
    type: 'title';
    props: {
        children: EmbedTextElement[];
    };
}

export const renderTitle: RenderChildFn<EmbedTitle> = (el) => (embed) =>
    embed.setTitle(renderTextElementGroup(el.props.children));

export const Title = ({ children }: { children?: EmbedTextElement[] }): EmbedTitle => {
    return {
        type: 'title',
        props: {
            children: children ?? [''],
        },
        key: null,
    };
};
