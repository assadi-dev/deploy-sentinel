import { ENV } from "@core/env";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(ENV.DISCORD_BOT_TOKEN);
