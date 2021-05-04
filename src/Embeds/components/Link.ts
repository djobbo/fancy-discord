import { renderTextElement } from '../createEmbed';
import { EmbedTextElement, IEmbedElement, RenderTextFn } from '../types';

export interface EmbedLink extends IEmbedElement {
    type: 'link';
    props: {
        children: EmbedTextElement[];
        href: string;
    };
}

export const renderLink: RenderTextFn<EmbedLink> = (el) =>
    `[${renderTextElement(el.props.children)}](${el.props.href})`;

export const Link = ({ children, href }: { children?: EmbedTextElement; href: string }): EmbedLink => {
    return {
        type: 'link',
        props: {
            children: children ? [children] : [''],
            href,
        },
        key: null,
    };
};
