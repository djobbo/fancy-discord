import { MessageEmbed } from 'discord.js';
import {
    EmbedWrapper,
    EmbedTitle,
    EmbedColor,
    EmbedDescription,
    EmbedField,
    EmbedLineBreak,
    EmbedLink,
    EmbedSpan,
    EmbedImage,
    EmbedTimestamp,
    EmbedURL,
    EmbedAuthor,
    EmbedFooter,
} from './components';

type Key = string | number | null;

export interface IEmbedElement {
    type: string;
    props: {
        children?: [] | EmbedTextElement[] | EmbedChildElement[];
    };
    key: Key;
}

export type EmbedChildElement =
    | EmbedTitle
    | EmbedColor
    | EmbedDescription
    | EmbedField
    | EmbedImage
    | EmbedTimestamp
    | EmbedURL
    | EmbedAuthor
    | EmbedFooter;

export type EmbedElement = EmbedWrapper | EmbedChildElement;
export type EmbedTextComponent = EmbedLineBreak | EmbedSpan | EmbedLink;
export type EmbedTextElement = string | EmbedTextComponent | EmbedTextElement[];

export type EmbedComponent<T extends EmbedWrapper | EmbedChildElement | EmbedTextComponent> = (
    props: Omit<T['props'], 'children'> & { children?: T['props']['children'] },
) => T;

export type RenderChildFn<T extends EmbedChildElement | EmbedChildElement[]> = (el: T) => (embed: MessageEmbed) => void;
export type RenderTextFn<T extends EmbedTextElement> = (el: T) => string;
