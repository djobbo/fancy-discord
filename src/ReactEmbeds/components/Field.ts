import { renderTextElementGroup } from '../createEmbed';
import { IEmbedElement, EmbedTextElement, RenderChildFn } from '../types';

export interface EmbedField extends IEmbedElement {
    type: 'field';
    props: {
        children: EmbedTextElement[];
        title: EmbedTextElement[];
        inline: boolean;
    };
}

export const renderField: RenderChildFn<EmbedField> = (el) => {
    const { title, children, inline } = el.props;
    return (embed) => embed.addField(renderTextElementGroup(title), renderTextElementGroup(children), inline);
};

export const Field = ({
    children,
    title,
    inline = false,
}: {
    children?: EmbedTextElement[];
    title: string | EmbedTextElement[];
    inline?: boolean;
}): EmbedField => {
    return {
        type: 'field',
        props: {
            children: children ?? [],
            title: typeof title === 'string' ? [title] : title,
            inline,
        },
        key: null,
    };
};
