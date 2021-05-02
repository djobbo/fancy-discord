import { IEmbedElement, EmbedTextElement } from '../types';

export interface EmbedField extends IEmbedElement {
    type: 'field';
    props: {
        children: EmbedTextElement[];
        title: EmbedTextElement[];
        inline: boolean;
    };
}

export const field = ({
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
            children: children ?? [''],
            title: typeof title === 'string' ? [title] : title,
            inline,
        },
        key: null,
    };
};
