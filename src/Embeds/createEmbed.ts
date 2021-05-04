import { MessageEmbed } from 'discord.js';
import {
    EmbedWrapper,
    renderAuthor,
    renderColor,
    renderDescription,
    renderField,
    renderFooter,
    renderImage,
    renderLineBreak,
    renderLink,
    renderSpan,
    renderTimestamp,
    renderTitle,
    renderUrl,
} from './components';

import { EmbedChildElement, EmbedTextElement, RenderChildFn, RenderTextFn } from './types';

export const renderTextElementGroup: RenderTextFn<EmbedTextElement[]> = (textElGroup): string =>
    textElGroup.map(renderTextElement).join('');

export const renderTextElement: RenderTextFn<EmbedTextElement> = (el): string => {
    if (typeof el === 'string') return el;

    if (typeof el === 'number') return el.toString();

    if (Array.isArray(el)) return renderTextElementGroup(el);

    switch (el.type) {
        case 'br':
            return renderLineBreak(el);
        case 'link':
            return renderLink(el);
        case 'span':
            return renderSpan(el);
        default:
            return '';
    }
};

export const renderChildren: RenderChildFn<EmbedChildElement[]> = (el) => (embed) =>
    el.forEach((child) => renderChild(child)(embed));

export const renderChild: RenderChildFn<EmbedChildElement | EmbedChildElement[]> = (el) => {
    if (Array.isArray(el)) return renderChildren(el);

    switch (el.type) {
        case 'author':
            return renderAuthor(el);
        case 'color':
            return renderColor(el);
        case 'description':
            return renderDescription(el);
        case 'footer':
            return renderFooter(el);
        case 'field':
            return renderField(el);
        case 'image':
            return renderImage(el);
        case 'timestamp':
            return renderTimestamp(el);
        case 'title':
            return renderTitle(el);
        case 'url':
            return renderUrl(el);
        case 'wrapper':
            return renderChild(el.props.children);
        default:
            return (embed) => embed;
    }
};

export const createEmbed = (el: EmbedWrapper): MessageEmbed => {
    const embed = new MessageEmbed({});

    renderChild(el.props.children)(embed);

    return embed;
};
