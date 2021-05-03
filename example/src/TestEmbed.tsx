import {
    Author,
    Break,
    Color,
    Description,
    EmbedWrapper,
    Field,
    Footer,
    Image,
    Link,
    React,
    Span,
    Title,
    Wrapper,
} from '../../lib/Embeds';

interface TestEmbedProps {
    color: string;
    title: string;
    name: string;
    repeat: number;
    icon?: string | null;
}

export const TestEmbed = ({ color, title, name, repeat, icon }: TestEmbedProps): EmbedWrapper => (
    <Wrapper>
        <Title>{title}</Title>
        <Color hex={color} />
        <Author name={`Author: ${name}`} />
        <Description>
            <Span bold italic>
                Yo
            </Span>{' '}
            c'est une
            <Break />
            description de fou {name}! <Span bold>Bold</Span>
        </Description>
        {icon && <Image url={icon} />}
        {Array.from({ length: repeat }, (_, i) => (
            <Field title={`Field Title ${i}`} inline={i < 2}>
                XD
                <Break />
                <Span italic>Italic!!! {name}</Span> <Link href="https://google.com">Hello</Link>
            </Field>
        ))}
        <Footer iconUrl={icon || undefined}>This is a footer</Footer>
    </Wrapper>
);
