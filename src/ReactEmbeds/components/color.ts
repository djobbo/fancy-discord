import { IEmbedElement } from '../types';

export interface EmbedColor extends IEmbedElement {
    type: 'color';
    props: {
        hex: string;
        children: [];
    };
}

export const color = ({ hex }: { hex: string }): EmbedColor => {
    return {
        type: 'color',
        props: {
            hex,
            children: [],
        },
        key: null,
    };
};
