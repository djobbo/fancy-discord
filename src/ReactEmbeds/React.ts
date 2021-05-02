import { EmbedComponent, EmbedElement } from './types';
export * as Embed from './components';
export * from './createEmbed';

const createElement = <T extends EmbedElement, FC extends EmbedComponent<T>>(
    el: FC,
    props: T['props'],
    ...children: Required<T['props']>['children']
): EmbedElement => el({ ...props, children: children ?? [] });

export const React = {
    createElement,
};
