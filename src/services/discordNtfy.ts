import { ENV } from "@core/env";
import { TOKENS } from "@core/token";
import { Channel } from "diagnostics_channel";
import { Client, EmbedBuilder } from "discord.js";
import { container } from "tsyringe";

export class DiscordNtfy {
  private client: Client;
  private discordChannelId = ENV.DISCORD_CHANNEL_ID;

  constructor() {
    this.client = container.resolve<Client>(TOKENS.discord.client);
  }

  async sendBuildSuccessToChannel() {
    try {
      const channel = await this.client.channels.fetch(this.discordChannelId);
      if (!channel) return console.error("Salon Discord introuvable.");
      const embed = new EmbedBuilder();
      embed
        .setTitle("Notification ntfy")
        .setDescription("Build terminé")
        .setColor("#00AAFF")
        .setTimestamp()
        .setFooter({
          text: "Reçu via ntfy",
          iconURL: "https://ntfy.sh/static/img/ntfy.png",
        });
      await channel.send({ embeds: [embed] });
      console.log("✅ Notification envoyée sur Discord !");
    } catch (error) {
      console.log(`Error send build success message: ${error.message}`);
    }
  }

  async sendBuildFailedToChannel() {
    try {
      const channel = await this.client.channels.fetch(this.discordChannelId);
      if (!channel) return console.error("Salon Discord introuvable.");
      console.log("✅ Notification envoyée sur Discord !");
    } catch (error) {
      console.log(`Error send build failed message: ${error.message}`);
    }
  }
}
