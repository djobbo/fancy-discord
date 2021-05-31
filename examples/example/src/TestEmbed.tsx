import { React } from 'fancy-discord.js/embeds';

interface Props {
    color: string;
    name: string;
    text: string;
    icon?: string;
    latestEmoji?: string;
}

export const TestEmbed = ({ color, name, text, icon, latestEmoji }: Props) => (
    <>
        <author iconURL={icon}>{name}</author>
        <color hex={color} />
        <field title="Message">{text}</field>
        {latestEmoji && <field title="latest emoji">{latestEmoji}</field>}
    </>
);
