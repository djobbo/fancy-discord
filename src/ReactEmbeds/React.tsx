import { MessageEmbed } from 'discord.js';

type Key = string | null;

export interface IEmbedElement {
    type: string;
    props: {
        children?: unknown[];
    };
    key: Key;
}

export interface EmbedWrapper extends IEmbedElement {
    type: 'wrapper';
    props: {
        children: (EmbedChildElement | EmbedChildElement[])[];
    };
}

export interface EmbedTitle extends IEmbedElement {
    type: 'title';
    props: {
        children: EmbedTextElement[];
    };
}

export interface EmbedDescription extends IEmbedElement {
    type: 'description';
    props: {
        children: EmbedTextElement[];
    };
}

export interface EmbedColor extends IEmbedElement {
    type: 'color';
    props: {
        hex: string;
        children: [];
    };
}

export interface EmbedLineBreak extends IEmbedElement {
    type: 'br';
    props: {
        children: [];
    };
}

export interface EmbedSpan extends IEmbedElement {
    type: 'span';
    props: {
        children: EmbedTextElement[];
        bold: boolean;
        italic: boolean;
    };
}

export interface EmbedLink extends IEmbedElement {
    type: 'link';
    props: {
        children: EmbedTextElement[];
        href: string;
    };
}

export interface EmbedField extends IEmbedElement {
    type: 'field';
    props: {
        children: EmbedTextElement[];
        title: EmbedTextElement[];
        inline: boolean;
    };
}

export type EmbedChildElement = EmbedTitle | EmbedColor | EmbedDescription | EmbedField;
export type EmbedElement = EmbedWrapper | EmbedChildElement;
export type EmbedTextElement = string | EmbedLineBreak | EmbedSpan | EmbedLink | EmbedTextElement[];

export type EmbedComponent<T extends EmbedWrapper | EmbedChildElement> = (props: T['props']) => T;

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

export const Embed = {
    wrapper: ({ children }: { children?: EmbedChildElement[] }): EmbedWrapper => {
        return {
            type: 'wrapper',
            props: {
                children: children ?? [],
            },
            key: null,
        };
    },
    title: ({ children }: { children?: EmbedTextElement[] }): EmbedTitle => {
        return {
            type: 'title',
            props: {
                children: children ?? [''],
            },
            key: null,
        };
    },
    color: ({ hex }: { hex: string }): EmbedColor => {
        return {
            type: 'color',
            props: {
                hex,
                children: [],
            },
            key: null,
        };
    },
    // createdAt
    description: ({ children }: { children?: EmbedTextElement[] }): EmbedDescription => {
        return {
            type: 'description',
            props: {
                children: children ?? [''],
            },
            key: null,
        };
    },
    field: ({
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
    },
    br: (): EmbedLineBreak => {
        return {
            type: 'br',
            props: {
                children: [],
            },
            key: null,
        };
    },
    span: ({
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
    },
    link: ({ children, href }: { children?: EmbedTextElement[]; href: string }): EmbedLink => {
        return {
            type: 'link',
            props: {
                children: children ?? [''],
                href,
            },
            key: null,
        };
    },
};
