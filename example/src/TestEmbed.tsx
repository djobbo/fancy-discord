import { React, Embed } from '../../lib';

interface TestEmbedProps {
    color: string;
    title: string;
    name: string;
    repeat: number;
    icon?: string | null;
}

export const TestEmbed = ({ color, title, name, repeat, icon }: TestEmbedProps): Embed.EmbedWrapper => (
    <Embed.wrapper>
        <Embed.title>{title}</Embed.title>
        <Embed.color hex={color} />
        <Embed.author />
        <Embed.description>
            <Embed.span bold italic>
                Yo
            </Embed.span>{' '}
            c'est une
            <Embed.br />
            description de fou {name}! <Embed.span bold>Bold</Embed.span>
        </Embed.description>
        {icon && <Embed.image url={icon} />}
        {Array.from({ length: repeat }, (_, i) => (
            <Embed.field title={`Field Title ${i}`} inline={i < 2}>
                XD
                <Embed.br />
                <Embed.span italic>Italic!!! {name}</Embed.span>{' '}
                <Embed.link href="https://google.com">Hello</Embed.link>
            </Embed.field>
        ))}
        <Embed.footer iconUrl={icon || undefined}>This is a footer</Embed.footer>
    </Embed.wrapper>
);
