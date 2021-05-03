import { renderTextElementGroup } from '../createEmbed';
import { IEmbedElement, EmbedTextElement, RenderTextFn } from '../types';

export interface EmbedSpan extends IEmbedElement {
    type: 'span';
    props: {
        children: EmbedTextElement[];
        bold: boolean;
        italic: boolean;
    };
}

export const renderSpan: RenderTextFn<EmbedSpan> = (el) => {
    const { bold, italic, children } = el.props;
    let outStr = renderTextElementGroup(children);
    if (bold) outStr = `**${outStr}**`;
    if (italic) outStr = `_${outStr}_`;
    return outStr;
};

export const Span = ({
    children,
    bold = false,
    italic = false,
}: {
    children?: EmbedTextElement[];
    bold?: boolean;
    italic?: boolean;
}): EmbedSpan => {
    return {
        type: 'span',
        props: {
            children: children ?? [''],
            bold,
            italic,
        },
        key: null,
    };
};
