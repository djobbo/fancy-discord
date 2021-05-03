import { IEmbedElement, RenderChildFn } from '../types';

export interface EmbedColor extends IEmbedElement {
    type: 'color';
    props: {
        hex: string;
        children: [];
    };
}

export const renderColor: RenderChildFn<EmbedColor> = (el) => (embed) => embed.setColor(el.props.hex);

export const Color = ({ hex }: { hex: string }): EmbedColor => {
    return {
        type: 'color',
        props: {
            hex,
            children: [],
        },
        key: null,
    };
};
