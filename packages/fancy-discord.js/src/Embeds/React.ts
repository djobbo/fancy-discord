import { MessageEmbed } from 'discord.js';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        type IntrinsicElements = EmbedElements;
    }
}

type Element =
    | string
    | number
    | {
          type: string;
          props: Record<string, unknown> & { children: Element[] };
          key: string | number | null;
      }
    | Element[];

type MessageEmbedResult = string | number | MessageEmbed;

interface EmbedElements {
    author: { children?: Element; iconURL?: string; url?: string };
    br: Record<string, never>;
    color: { hex: string };
    desc: { children?: Element };
    field: { children?: Element; title: Element; inline?: boolean };
    footer: { children?: Element; iconUrl?: string };
    img: { url: string };
    link: { href: string; children?: Element };
    timestamp: { timestamp: number | Date };
    title: { children?: Element };
    // underline / crossed
    span: { children?: Element; bold?: boolean; italic?: boolean };
    url: { href: string };
}

type RenderElementFn<T extends keyof EmbedElements> = (
    props: EmbedElements[T],
    embed: MessageEmbedResult,
) => MessageEmbedResult;

const renderTextElement = (el: Element | undefined, embed: string | number = ''): string => {
    const res = renderElement(el ?? '', embed);
    if (typeof res !== 'string') throw new Error('Parsing Error');
    return res;
};

const renderGroupElement = (children: Element[], embed: MessageEmbedResult): MessageEmbedResult => {
    return children.reduce((acc, child) => {
        if (Array.isArray(child)) return renderGroupElement(child, acc);

        return renderElement(child, acc);
        // return typeof child === 'function' ? child(acc) : child.toString();
    }, embed);
};

const renderAuthor: RenderElementFn<'author'> = ({ children, iconURL, url }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <author/>');

    const name = renderTextElement(children);
    return embed.setAuthor(name, iconURL, url);
};

const renderLineBreak: RenderElementFn<'br'> = (_, embed) => {
    if (embed instanceof MessageEmbed) throw new Error('Bad node type <br/>');

    return embed + '\n';
};

const renderColor: RenderElementFn<'color'> = ({ hex }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <color/>');

    return embed.setColor(hex);
};

const renderDescription: RenderElementFn<'desc'> = ({ children }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <desc/>');

    return embed.setDescription(renderTextElement(children));
};

const renderField: RenderElementFn<'field'> = ({ title, children, inline }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <field/>');

    return embed.addField(renderTextElement(title), renderTextElement(children), inline);
};

const renderFooter: RenderElementFn<'footer'> = ({ children, iconUrl }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <footer/>');

    return embed.setFooter(renderTextElement(children), iconUrl);
};

const renderImage: RenderElementFn<'img'> = ({ url }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <img/>');

    return embed.setImage(url);
};

const renderLink: RenderElementFn<'link'> = ({ children, href }, embed) => {
    if (embed instanceof MessageEmbed) throw new Error('Bad node type <link/>');

    return `[${renderTextElement(children, embed)}](${href})`;
};

const renderSpan: RenderElementFn<'span'> = ({ children, bold, italic }, embed) => {
    if (embed instanceof MessageEmbed) throw new Error('Bad node type <span/>');

    let outStr = renderTextElement(children, embed);
    if (bold) outStr = `**${outStr}**`;
    if (italic) outStr = `_${outStr}_`;
    return outStr;
};

const renderTimestamp: RenderElementFn<'timestamp'> = ({ timestamp }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <timestamp/>');

    return embed.setTimestamp(timestamp);
};

const renderTitle: RenderElementFn<'title'> = ({ children }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <title/>');

    return embed.setTitle(renderTextElement(children));
};

const renderUrl: RenderElementFn<'url'> = ({ href }, embed) => {
    if (!(embed instanceof MessageEmbed)) throw new Error('Bad node type <url/>');

    return embed.setURL(href);
};

function createElement(
    el: string | ((props: Record<string, unknown>) => Element) | undefined,
    props: Record<string, unknown>,
    ...children: Element[]
): Element {
    if (typeof el === 'function') return el({ ...props, children });

    return {
        type: el,
        props: {
            ...props,
            children,
        },
        key: null,
    } as Element;
}

function renderElement(el: Element, embed: MessageEmbedResult): MessageEmbedResult {
    if (typeof el !== 'object') return embed + el.toString();

    if (Array.isArray(el)) return renderGroupElement(el, embed);

    const { type, props } = el;
    if (typeof type === 'undefined') return renderGroupElement(props.children, embed);

    switch (type) {
        case 'author':
            return renderAuthor((props as unknown) as EmbedElements['author'], embed);
        case 'br':
            return renderLineBreak((props as unknown) as EmbedElements['br'], embed);
        case 'color':
            return renderColor((props as unknown) as EmbedElements['color'], embed);
        case 'desc':
            return renderDescription((props as unknown) as EmbedElements['desc'], embed);
        case 'field':
            return renderField((props as unknown) as EmbedElements['field'], embed);
        case 'footer':
            return renderFooter((props as unknown) as EmbedElements['footer'], embed);
        case 'img':
            return renderImage((props as unknown) as EmbedElements['img'], embed);
        case 'link':
            return renderLink((props as unknown) as EmbedElements['link'], embed);
        case 'span':
            return renderSpan((props as unknown) as EmbedElements['span'], embed);
        case 'timestamp':
            return renderTimestamp((props as unknown) as EmbedElements['timestamp'], embed);
        case 'title':
            return renderTitle((props as unknown) as EmbedElements['title'], embed);
        case 'url':
            return renderUrl((props as unknown) as EmbedElements['url'], embed);
        default:
            return embed;
    }
}

export const createEmbed = (el: Element): MessageEmbed => {
    const embed = new MessageEmbed();
    const newEmbed = renderElement(el, embed);
    if (!(newEmbed instanceof MessageEmbed)) throw new Error('Embed generation failed!');

    return newEmbed;
};

export const React = {
    createElement,
};
