import { MessageCreateOptions, MessagePayload } from "discord.js";
import z from "zod";

export const sendMessageToChannelSchema = z.object({
  message: z.union([z.string(), z.instanceof(MessagePayload)]),
  channelId: z.string().min(1),
});

export type SendMessageToChannelInfer = z.infer<
  typeof sendMessageToChannelSchema
>;

export type SendMessageOptions = string | MessagePayload | MessageCreateOptions;

export type SendMessageToChannelArgs = {
  channelId: string;
  message: SendMessageOptions;
};

export type EmbedTypeMessage = "success" | "failed" | "info";
