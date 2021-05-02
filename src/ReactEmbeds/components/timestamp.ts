import { IEmbedElement, RenderChildFn } from '../types';

export interface EmbedTimestamp extends IEmbedElement {
    type: 'timestamp';
    props: {
        timestamp: number | Date;
        children: [];
    };
}

export const renderTimestamp: RenderChildFn<EmbedTimestamp> = (el) => {
    const { timestamp } = el.props;
    return (embed) => embed.setTimestamp(timestamp);
};

export const timestamp = ({ timestamp }: { timestamp: number | Date }): EmbedTimestamp => {
    return {
        type: 'timestamp',
        props: {
            timestamp,
            children: [],
        },
        key: null,
    };
};
