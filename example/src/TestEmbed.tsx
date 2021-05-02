import { React, Embed, EmbedWrapper } from '../../lib';

interface TestEmbedProps {
    color: string;
    title: string;
    name: string;
    repeat: number;
}

export const TestEmbed = ({ color, title, name, repeat }: TestEmbedProps): EmbedWrapper => (
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
            <Embed.field title={`Field Title ${i}`}>
                XD
                <Embed.br />
                <Embed.span italic>Italic!!! {name}</Embed.span>{' '}
                <Embed.link href="https://google.com">Hello</Embed.link>
            </Embed.field>
        ))}
    </Embed.wrapper>
);

// console.log(createEmbed(<TestEmbed color="#dd2222" title="EZ" name="JAAJ" repeat={3} />));
