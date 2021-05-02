import { MessageEmbed } from 'discord.js';

export interface IEmbedElement {
    type: string;
    props: {
        children?: unknown[];
    };
}

export interface EmbedWrapper extends IEmbedElement {
    type: 'embed';
    props: {
        children: EmbedChildElement[];
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
export type EmbedTextElement = string | EmbedLineBreak | EmbedSpan | EmbedLink;

export type EmbedComponent<T extends EmbedWrapper | EmbedChildElement> = (props: T['props']) => T;

const renderTextElementGroup = (textElGroup: EmbedTextElement[]) => textElGroup.map(renderTextElement).join('');

const renderTextElement = (el: EmbedTextElement): string => {
    if (typeof el === 'string') return el;

    switch (el.type) {
        case 'br':
            console.log('br');
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

const renderChild = (el: EmbedChildElement): ((embed: MessageEmbed) => MessageEmbed) => {
    switch (el.type) {
        case 'title':
            console.log('title', el.props.children);
            return (embed) => embed.setTitle(renderTextElementGroup(el.props.children));
        case 'color':
            console.log('hex', el.props.hex);
            return (embed) => embed.setColor(el.props.hex);
        case 'description':
            console.log('description', el.props.children);
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
            type: 'embed',
            props: {
                children: children ?? [],
            },
        };
    },
    title: ({ children }: { children?: EmbedTextElement[] }): EmbedTitle => {
        return {
            type: 'title',
            props: {
                children: children ?? [''],
            },
        };
    },
    color: ({ hex }: { hex: string }): EmbedColor => {
        return {
            type: 'color',
            props: {
                hex,
                children: [],
            },
        };
    },
    // createdAt
    description: ({ children }: { children?: EmbedTextElement[] }): EmbedDescription => {
        return {
            type: 'description',
            props: {
                children: children ?? [''],
            },
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
        };
    },
    br: (): EmbedLineBreak => {
        return {
            type: 'br',
            props: {
                children: [],
            },
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
        };
    },
    link: ({ children, href }: { children?: EmbedTextElement[]; href: string }): EmbedLink => {
        return {
            type: 'link',
            props: {
                children: children ?? [''],
                href,
            },
        };
    },
};

const TestEmbed = ({ color, title, name }: { color: string; title: string; name: string }): EmbedWrapper => (
    <Embed.wrapper>
        <Embed.title>{title}</Embed.title>
        <Embed.color hex={color} />
        <Embed.description>
            <Embed.span bold italic>
                Yo
            </Embed.span>{' '}
            c'est une
            <Embed.br />
            description de fou {name}! <Embed.span bold>Bold</Embed.span>
        </Embed.description>
        <Embed.field title="Field Title">
            XD
            <Embed.br />
            <Embed.span italic>Italic!!! {name}</Embed.span> <Embed.link href="https://google.com">Hello</Embed.link>
        </Embed.field>
    </Embed.wrapper>
);

console.log(createEmbed(<TestEmbed color="#dd2222" title="EZ" name="JAAJ" />));
