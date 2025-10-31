import { TOKENS } from "@core/token";
import { Channel, Client } from "discord.js";
import { container } from "tsyringe";
import {
  SendMessageOptions,
  SendMessageToChannelArgs,
} from "../models/discordActionModel";
import { ZodError } from "zod";
import { genericParserError, zodParserError } from "../lib/parser";

export class DiscordMessage {
  private client: Client;

  constructor() {
    this.client = container.resolve<Client>(TOKENS.discord.client);
  }

  async getChannel(channelId: string): Promise<Channel | null> {
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (!channel) throw Error("This channel is no exist !");
      return channel;
    } catch (error) {
      genericParserError(error);
      return null;
    }
  }

  private async sendSendableChannel(
    channel: Channel,
    message: SendMessageOptions
  ) {
    if (channel.isSendable()) {
      await channel.send(message);
    } else {
      console.error(
        "Le channel récupéré n'est pas textuel. type =",
        channel.type
      );
    }
  }

  async sendToChannel({ message, channelId }: SendMessageToChannelArgs) {
    try {
      const channel = await this.getChannel(channelId);
      this.sendSendableChannel(channel, message);
    } catch (error) {
      if (error instanceof ZodError) zodParserError(error);
      else genericParserError(error);
    }
  }

  async sendToUser() {}
  async sendToBot() {}
}
