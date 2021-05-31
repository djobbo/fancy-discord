import { Emoji } from 'discord.js';

export const getEmojiString = (emoji: Emoji): string =>
    emoji.createdAt ? `<${emoji.animated ? '' : ':'}${emoji.identifier}>` : emoji.name;
