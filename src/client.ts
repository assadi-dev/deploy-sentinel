import { ENV } from "@core/env";
import { TOKENS } from "@core/token";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { container } from "tsyringe";
import { SubscribeNtfy } from "./services/subscribeNtfy";
import { registerDependencies } from "./injections/registerDependencies";

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

registerDependencies();
const ntfyServices = new SubscribeNtfy();
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  ntfyServices.subscribe();
});

client.login(ENV.DISCORD_BOT_TOKEN);
