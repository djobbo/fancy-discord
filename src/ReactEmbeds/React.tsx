import { MessageEmbed } from 'discord.js';

export type EmbedChildElement = EmbedTitle | EmbedColor | EmbedDescription;
export type EmbedElement = EmbedWrapper | EmbedChildElement;

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
        children: [string];
    };
}

export interface EmbedDescription extends IEmbedElement {
    type: 'description';
    props: {
        children: [string];
    };
}

export interface EmbedColor extends IEmbedElement {
    type: 'color';
    props: {
        hex: string;
        children: [];
    };
}

export type EmbedComponent<T extends EmbedWrapper | EmbedChildElement> = (props: T['props']) => T;

const renderChild = (el: EmbedChildElement): ((embed: MessageEmbed) => MessageEmbed) => {
    switch (el.type) {
        case 'title':
            console.log('title', el.props.children);
            return (embed: MessageEmbed) => embed.setTitle(el.props.children.join(' '));
        case 'color':
            console.log('hex', el.props.hex);
            return (embed: MessageEmbed) => embed.setColor(el.props.hex);
        case 'description':
            console.log('description', el.props.children);
            return (embed: MessageEmbed) => embed.setDescription(el.props.children.join(' '));
        default:
            return (embed: MessageEmbed) => embed;
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
    title: ({ children }: { children?: [string] }): EmbedTitle => {
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
    description: ({ children }: { children?: [string] }): EmbedDescription => {
        return {
            type: 'description',
            props: {
                children: children ?? [''],
            },
        };
    },
    //linebreak
    //bold/italic
    //link
};

const TestEmbed = ({ color, title, name }: { color: string; title: string; name: string }): EmbedWrapper => (
    <Embed.wrapper>
        <Embed.title>{title}</Embed.title>
        <Embed.color hex={color} />
        <Embed.description>
            Yo c'est une{'\n'}description de fou {name}!
        </Embed.description>
    </Embed.wrapper>
);

console.log(createEmbed(<TestEmbed color="#dd2222" title="EZ" name="JAAJ" />));
