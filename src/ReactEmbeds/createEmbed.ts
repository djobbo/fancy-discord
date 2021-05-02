import { MessageEmbed } from 'discord.js';
import {
    EmbedWrapper,
    renderColor,
    renderDescription,
    renderField,
    renderLineBreak,
    renderLink,
    renderSpan,
    renderTitle,
} from './components';
import { EmbedChildElement, EmbedTextElement, RenderChildFn, RenderTextFn } from './types';

export const renderTextElementGroup = (textElGroup: EmbedTextElement[]): string =>
    textElGroup.map(renderTextElement).join('');

export const renderTextElement: RenderTextFn<EmbedTextElement> = (el): string => {
    if (typeof el === 'string') return el;

    if (Array.isArray(el)) return renderTextElementGroup(el);

    switch (el.type) {
        case 'br':
            return renderLineBreak(el);
        case 'span':
            return renderSpan(el);
        case 'link':
            return renderLink(el);
        default:
            return '';
    }
};

export const renderChild: RenderChildFn<EmbedChildElement | EmbedChildElement[]> = (el) => {
    if (Array.isArray(el)) return (embed) => el.forEach((child) => renderChild(child)(embed));

    switch (el.type) {
        case 'title':
            return renderTitle(el);
        case 'color':
            return renderColor(el);
        case 'description':
            return renderDescription(el);
        case 'field':
            return renderField(el);
        default:
            return (embed) => embed;
    }
};

export const createEmbed = (el: EmbedWrapper): MessageEmbed => {
    const embed = new MessageEmbed({});
    el.props.children.forEach((child) => renderChild(child)(embed));
    return embed;
};
