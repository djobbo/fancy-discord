import { EmbedComponent, IEmbedElement, RenderTextFn } from '../types';

export interface EmbedLineBreak extends IEmbedElement {
    type: 'br';
    props: {
        children?: [];
    };
}

export const renderLineBreak: RenderTextFn<EmbedLineBreak> = () => '\n';

export const br: EmbedComponent<EmbedLineBreak> = () => {
    return {
        type: 'br',
        props: {
            children: [],
        },
        key: null,
    };
};
