import { EMBED_COLORS } from "@core/embed";
import { ENV } from "@core/env";
import { TOKENS } from "@core/token";
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
        .setColor(EMBED_COLORS.success)
        .setTimestamp()
        .setFooter({
          text: "Reçu via ntfy",
          iconURL: "https://ntfy.sh/static/img/ntfy.png",
        });
      if (channel.isSendable()) {
        await channel.send({ embeds: [embed] });
      } else {
        console.error(
          "Le channel récupéré n'est pas textuel. type =",
          channel.type
        );
      }

      console.log("✅ Notification envoyée sur Discord !");
    } catch (error) {
      console.log(`Error send build success message: ${error.message}`);
    }
  }

  async sendBuildFailedToChannel() {
    try {
      const channel = await this.client.channels.fetch(this.discordChannelId);
      if (!channel) return console.error("Salon Discord introuvable.");
      const embed = new EmbedBuilder();
      embed
        .setTitle("Notification ntfy")
        .setDescription("Échec du build")
        .setColor(EMBED_COLORS.danger)
        .setTimestamp()
        .setFooter({
          text: "Reçu via ntfy",
          iconURL: "https://ntfy.sh/static/img/ntfy.png",
        });
      if (channel.isSendable()) {
        await channel.send({ embeds: [embed] });
      } else {
        console.error(
          "Le channel récupéré n'est pas textuel. type =",
          channel.type
        );
      }

      console.log("✅ Notification envoyée sur Discord !");
    } catch (error) {
      console.log(`Error send build failed message: ${error.message}`);
    }
  }
}
