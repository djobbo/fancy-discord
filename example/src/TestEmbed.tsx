import { React, Embed } from '../../lib';

interface TestEmbedProps {
    color: string;
    title: string;
    name: string;
    repeat: number;
}

export const TestEmbed = ({ color, title, name, repeat }: TestEmbedProps): Embed.EmbedWrapper => (
    <Embed.wrapper>
        <Embed.title>{title}</Embed.title>
        <Embed.color hex={color} />
        <Embed.description>
            <Embed.span bold italic>
                Yo
            </Embed.span>{' '}
            c'est une
            <Embed.br />
            description de fou {name}! <Embed.span bold>Bold</Embed.span>
        </Embed.description>
        {Array.from({ length: repeat }, (_, i) => (
            <Embed.field title={`Field Title ${i}`} inline={i < 2}>
                XD
                <Embed.br />
                <Embed.span italic>Italic!!! {name}</Embed.span>{' '}
                <Embed.link href="https://google.com">Hello</Embed.link>
            </Embed.field>
        ))}
    </Embed.wrapper>
);
