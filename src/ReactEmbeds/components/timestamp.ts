import { IEmbedElement } from '../types';

export interface EmbedTimestamp extends IEmbedElement {
    type: 'timestamp';
    props: {
        timestamp: number | Date;
        children: [];
    };
}

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
