import { MessageEmbed } from 'discord.js';
import { EmbedWrapper } from './components';
import { EmbedTextElement, EmbedChildElement, EmbedElement, EmbedComponent } from './types';
export * as Embed from './components';

const renderTextElementGroup = (textElGroup: EmbedTextElement[]) => textElGroup.map(renderTextElement).join('');

const renderTextElement = (el: EmbedTextElement): string => {
    if (typeof el === 'string') return el;

    if (Array.isArray(el)) return renderTextElementGroup(el);

    switch (el.type) {
        case 'br':
            return '\n';
        case 'span': {
            const { bold, italic, children } = el.props;
            let outStr = renderTextElementGroup(children);
            if (bold) outStr = `**${outStr}**`;
            if (italic) outStr = `_${outStr}_`;
            return outStr;
        }
        case 'link':
            return `[${renderTextElementGroup(el.props.children)}](${el.props.href})`;
        default:
            return '';
    }
};

const renderChild = (el: EmbedChildElement | EmbedChildElement[]): ((embed: MessageEmbed) => void) => {
    if (Array.isArray(el)) return (embed) => el.forEach((child) => renderChild(child)(embed));

    switch (el.type) {
        case 'title':
            return (embed) => embed.setTitle(renderTextElementGroup(el.props.children));
        case 'color':
            return (embed) => embed.setColor(el.props.hex);
        case 'description':
            return (embed) => embed.setDescription(renderTextElementGroup(el.props.children));
        case 'field': {
            const { title, children, inline } = el.props;
            return (embed) => embed.addField(renderTextElementGroup(title), renderTextElementGroup(children), inline);
        }
        default:
            return (embed) => embed;
    }
};

export const createEmbed = (el: EmbedWrapper): MessageEmbed => {
    const embed = new MessageEmbed({});
    el.props.children.forEach((child) => renderChild(child)(embed));
    return embed;
};

const createElement = <T extends EmbedElement, FC extends EmbedComponent<T>>(
    el: FC,
    props: T['props'],
    ...children: Required<T['props']>['children']
): EmbedElement => el({ ...props, children: children ?? [] });

export const React = {
    createElement,
};
