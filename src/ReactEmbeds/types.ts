import {
    EmbedWrapper,
    EmbedTitle,
    EmbedColor,
    EmbedDescription,
    EmbedField,
    EmbedLineBreak,
    EmbedLink,
    EmbedSpan,
} from './components';

type Key = string | null;

export interface IEmbedElement {
    type: string;
    props: {
        children?: unknown[];
    };
    key: Key;
}

export type EmbedChildElement = EmbedTitle | EmbedColor | EmbedDescription | EmbedField;
export type EmbedElement = EmbedWrapper | EmbedChildElement;
export type EmbedTextElement = string | EmbedLineBreak | EmbedSpan | EmbedLink | EmbedTextElement[];

export type EmbedComponent<T extends EmbedWrapper | EmbedChildElement> = (props: T['props']) => T;
